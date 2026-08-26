import json
import os
import re
import time
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

def run_uat():
    uat_dir = r"C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\UAT"
    screenshot_dir = os.path.join(uat_dir, "screenshots")
    artifact_dir = os.path.join(uat_dir, "artifacts")
    os.makedirs(uat_dir, exist_ok=True)
    os.makedirs(screenshot_dir, exist_ok=True)
    os.makedirs(artifact_dir, exist_ok=True)

    network_requests = []
    console_errors = []
    page_errors = []

    def wire_page(page):
        page.on("request", lambda req: network_requests.append(req.url))
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

    def assert_onboarding_gate(page):
        assert not page.get_by_label(re.compile("Cam kết bảo mật")).is_checked()
        assert page.get_by_role("button", name="Bỏ qua bước này", exact=True).count() == 0
        assert page.locator('button[type="submit"]').is_disabled()

    def complete_onboarding(page):
        selects = page.locator("select")
        selects.nth(0).select_option(label="CEO / Tổng Giám Đốc")
        selects.nth(1).select_option(label="Ban Điều Hành")
        selects.nth(2).select_option(label="5 - 10 năm")
        selects.nth(3).select_option(label="Sản xuất / Chế tạo")
        selects.nth(4).select_option(label="20 - 50 nhân sự")
        selects.nth(5).select_option(label="10 - 50 tỷ VNĐ")
        page.get_by_label(re.compile("Cam kết bảo mật")).check()
        submit = page.locator('button[type="submit"]')
        assert submit.is_enabled()
        submit.click()
        assert not page.get_by_role("heading", name="Thông Tin Đơn Vị & Người Làm Khảo Sát").is_visible()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ----------------------------------------------------
        # TEST 1: DESKTOP VIEWPORT (1440 x 900)
        # ----------------------------------------------------
        print("=== TEST 1: Desktop Viewport (1440x900) ===")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        wire_page(page)

        page.goto("http://127.0.0.1:4173")
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        assert_onboarding_gate(page)
        # 1. Onboarding Screenshot
        page.screenshot(path=os.path.join(screenshot_dir, "desktop-1440x900-onboarding.png"), full_page=True)
        print("Saved: uat_desktop_01_onboarding.png")

        # Fill and Submit Onboarding
        page.fill('input[placeholder="VD: Nguyễn Văn A"]', "Hoàng Vũ - CEO")
        page.fill('input[placeholder="VD: Công ty TNHH ABC"]', "Công ty Cổ phần Công nghệ ABC")
        complete_onboarding(page)
        time.sleep(1)

        # 2. Survey Flow Screenshot
        page.screenshot(path=os.path.join(screenshot_dir, "desktop-1440x900-survey.png"), full_page=True)
        print("Saved: uat_desktop_02_survey_flow.png")

        # Answer all 60 questions:
        # P1 (Strategy): 4 (score-1=3 -> 75%)
        # P2 (Leadership): 4 (75%)
        # P3 (Culture): 4 (75%)
        # P4 (HR): 2 (score-1=1 -> 25%) -> Primary Bottleneck!
        # P5 (Operations): 2 (25%) -> Cluster!
        # P6 (Performance): 3 (50%)
        pillar_scores = {1: 4, 2: 4, 3: 4, 4: 2, 5: 2, 6: 3}

        for pillar_idx in range(1, 7):
            score_to_pick = pillar_scores[pillar_idx]
            print(f"Answering Pillar {pillar_idx} (score {score_to_pick})...")

            # Click all 10 question buttons for this score
            # Score labels: "1 - Chưa có", "2 - Tự phát", "3 - Chuẩn hoá", "4 - Được quản trị", "5 - Trở thành văn hoá"
            score_labels = {
                1: "1 - Chưa có",
                2: "2 - Tự phát",
                3: "3 - Chuẩn hoá",
                4: "4 - Được quản trị",
                5: "5 - Trở thành văn hoá"
            }
            target_label = score_labels[score_to_pick]

            buttons = page.locator(f'button:has-text("{target_label}")').all()
            for btn in buttons:
                btn.click()
                time.sleep(0.05)

            # Navigate to next pillar or view results
            if pillar_idx < 6:
                page.click('button:has-text("Sang Trụ")')
                time.sleep(0.5)
            else:
                page.click('button:has-text("Xem Báo Cáo Chẩn Đoán")')
                time.sleep(1)

        # 3. Results View Screenshot
        page.wait_for_selector('text=Kết Quả Chẩn Đoán Thực Thi Toàn Diện')
        page.get_by_text("54.17%", exact=True).wait_for()
        page.get_by_text("Thanh Gỗ Ngắn Nhất: Nhân lực xuất sắc (25%)", exact=True).wait_for()
        page.screenshot(path=os.path.join(screenshot_dir, "desktop-1440x900-results-radar-kuba.png"), full_page=True)
        print("Saved: uat_desktop_03_results_radar_kuba.png")

        # 4. Open PDF Preview Modal
        page.click('button:has-text("Xuất Báo Cáo PDF A4")')
        time.sleep(1)
        page.wait_for_selector('#pdf-report-content')
        page.screenshot(path=os.path.join(screenshot_dir, "desktop-1440x900-pdf-preview.png"), full_page=True)
        pdf_path = os.path.join(artifact_dir, "sample_exported_report.pdf")
        with page.expect_download(timeout=15000) as download_info:
            page.get_by_role("button", name="Tải File PDF A4", exact=True).click()
        download_info.value.save_as(pdf_path)
        assert os.path.getsize(pdf_path) > 0
        print("Saved: uat_desktop_04_pdf_preview.png")

        context.close()

        # Report-gating acceptance surface: no Results/PDF with 0/60 answers.
        gate_context = browser.new_context(viewport={"width": 1440, "height": 900})
        gate_page = gate_context.new_page()
        wire_page(gate_page)
        gate_page.goto("http://127.0.0.1:4173")
        gate_page.wait_for_load_state("networkidle")
        assert_onboarding_gate(gate_page)
        complete_onboarding(gate_page)
        gate_page.get_by_role("button", name="Trụ 6 Hiệu suất 0/10 câu", exact=True).click()
        report_gate = gate_page.get_by_role("button", name=re.compile("Hoàn thành đủ 60 câu"))
        assert report_gate.is_disabled()
        assert gate_page.get_by_role("button", name="Xuất Báo Cáo PDF A4", exact=True).count() == 0
        observed_gate = "VERIFIED: Results/PDF blocked at 0/60"
        gate_context.close()

        # Partial-N/A acceptance surface: percent uses valid denominator, Raw is not /300.
        partial_context = browser.new_context(viewport={"width": 1440, "height": 900})
        partial_page = partial_context.new_page()
        wire_page(partial_page)
        partial_page.goto("http://127.0.0.1:4173")
        partial_page.wait_for_load_state("networkidle")
        assert_onboarding_gate(partial_page)
        complete_onboarding(partial_page)
        for pillar_idx in range(1, 7):
            for question_idx in range(5):
                partial_page.locator('button:has-text("5 - Trở thành văn hoá")').nth(question_idx).click()
            for question_idx in range(5, 10):
                partial_page.get_by_role("button", name="N/A — Không áp dụng / Chưa đủ thông tin quan sát", exact=True).nth(question_idx).click()
            if pillar_idx < 6:
                partial_page.click('button:has-text("Sang Trụ")')
            else:
                partial_page.click('button:has-text("Xem Báo Cáo Chẩn Đoán")')
        partial_page.get_by_text("100%", exact=True).first.wait_for()
        partial_raw = partial_page.get_by_text(re.compile("N/A — có N/A hoặc câu chưa trả lời"), exact=False)
        assert partial_raw.count() == 1
        observed_partial = "VERIFIED: 100% with Raw marked N/A for partial N/A"
        partial_context.close()

        # ----------------------------------------------------
        # TEST 2: MOBILE VIEWPORT (390 x 844)
        # ----------------------------------------------------
        print("=== TEST 2: Mobile Viewport (390x844) ===")
        m_context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
        )
        m_page = m_context.new_page()
        wire_page(m_page)
        m_page.goto("http://127.0.0.1:4173")
        m_page.wait_for_load_state("networkidle")
        time.sleep(1)

        assert_onboarding_gate(m_page)
        complete_onboarding(m_page)
        time.sleep(0.5)

        # Answer all 60 questions on mobile to prove the responsive flow.
        for pillar_idx in range(1, 7):
            buttons = m_page.locator('button:has-text("3 - Chuẩn hoá")').all()
            assert len(buttons) == 10
            for btn in buttons:
                btn.click()
                time.sleep(0.02)
            if pillar_idx < 6:
                m_page.click('button:has-text("Sang Trụ")')
            else:
                m_page.click('button:has-text("Xem Báo Cáo Chẩn Đoán")')
        m_page.wait_for_selector('text=Đã hoàn thành 60/60 câu hỏi')

        mobile_metrics = m_page.evaluate("""() => ({innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth})""")
        assert mobile_metrics["scrollWidth"] <= mobile_metrics["clientWidth"]
        m_page.screenshot(path=os.path.join(screenshot_dir, "mobile-390x844-results.png"), full_page=True)
        print("Saved: uat_mobile_01_survey_flow.png")

        m_context.close()
        browser.close()

    # ----------------------------------------------------
    # NETWORK EGRESS AUDIT
    # ----------------------------------------------------
    print("=== NETWORK EGRESS AUDIT ===")
    external_requests = [u for u in network_requests if not u.startswith("http://127.0.0.1:4173") and not u.startswith("http://localhost:4173")]
    print(f"Total requests captured: {len(network_requests)}")
    print(f"External requests captured: {len(external_requests)}")
    if external_requests:
        print("External URLs found:", external_requests)
    else:
        print("PASSED: Zero external network egress verified!")

    assert not external_requests, f"External network egress detected: {external_requests}"
    assert not console_errors, f"Console errors detected: {console_errors}"
    assert not page_errors, f"Page errors detected: {page_errors}"

    with open(os.path.join(uat_dir, "network_audit.log"), "w", encoding="utf-8") as f:
        f.write("=== NETWORK EGRESS AUDIT LOG ===\n")
        f.write(f"Total requests: {len(network_requests)}\n")
        f.write(f"External requests: {len(external_requests)}\n\n")
        f.write("All request URLs:\n")
        for u in network_requests:
            f.write(f"- {u}\n")

    network_payload = {
        "target": "http://127.0.0.1:4173/",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_requests": len(network_requests),
        "external_requests": external_requests,
        "urls": network_requests,
        "console_errors": console_errors,
        "page_errors": page_errors,
        "claim_level": "VERIFIED",
    }
    with open(os.path.join(artifact_dir, "network_evidence.json"), "w", encoding="utf-8") as f:
        json.dump(network_payload, f, ensure_ascii=False, indent=2)

    with open(os.path.join(uat_dir, "uat_report_phase2_mvp.md"), "w", encoding="utf-8") as f:
        f.write("# LAMSEP MVP — UAT report\n\n")
        f.write(f"- Timestamp: {network_payload['timestamp']}\n")
        f.write("- Target: `http://127.0.0.1:4173/`\n")
        f.write("- Viewports: `1440x900`, `390x844`\n")
        f.write("- Claim level: VERIFIED for the asserted local cases\n")
        f.write("- Expected: onboarding gate, 60 questions, Radar/KUBA, PDF artifact, zero external egress\n")
        f.write(f"- Network evidence: {json.dumps(network_payload, ensure_ascii=False)}\n")
        f.write("- PDF artifact: `UAT/artifacts/sample_exported_report.pdf`\n")
        f.write("- Screenshots: `UAT/screenshots/`\n")
        f.write(f"- Report gate: `{observed_gate}`\n")
        f.write(f"- Partial N/A Raw rule: `{observed_partial}`\n")

    print("UAT Complete!")

if __name__ == "__main__":
    run_uat()
