import hashlib, os, json
from datetime import datetime, timezone

files = [
    'SURVEY_DESIGN_CONTRACT_V2.md',
    'MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md',
    'IMPLEMENTATION_PLAN_LAMSEP_V2_20260824.md',
    'src/App.tsx',
    'src/data/survey60Questions.ts',
    'src/types/survey.ts',
    'src/types/kuba.ts',
    'src/engine/scoringEngine.ts',
    'src/engine/bottleneck.ts',
    'src/components/OnboardingModal.tsx',
    'src/components/QuestionSection.tsx',
    'src/components/MaturityReport.tsx',
    'src/components/PDFExportView.tsx',
    'src/components/HexagonRadarChart.tsx',
    'src/components/BottleneckAlert.tsx',
    'src/components/KUBAModule.tsx',
    'src/components/Header.tsx',
    'src/components/ProgressBar.tsx',
    'src/components/LikertButtonGroup.tsx',
    'src/utils/storageHelper.ts',
    'src/utils/pdfGenerator.ts',
    'run_browser_uat.py',
    'UAT/uat_report_phase2_mvp.md',
    'UAT/artifacts/font_provenance.md',
    'UAT/artifacts/pdf_inspection_20260824.md',
    'UAT/artifacts/sample_exported_report.pdf',
    'UAT/artifacts/network_evidence.json'
]

base_dir = r'C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep'
manifest = {
    'generated_at': datetime.now(timezone.utc).isoformat(),
    'workspace': base_dir,
    'contract_version': 'v2.1',
    'master_plan_version': 'v2.1',
    'files': {}
}

table_lines = [
    '| Tệp tin Artifact | Dung lượng | SHA-256 Hash | Claim Level |',
    '| :--- | :---: | :--- | :---: |'
]

for rel_path in files:
    full_path = os.path.join(base_dir, rel_path)
    clean_rel = rel_path.replace('\\', '/')
    if os.path.exists(full_path):
        with open(full_path, 'rb') as f:
            content = f.read()
            sha256 = hashlib.sha256(content).hexdigest().upper()
            size = len(content)
        claim = 'UNVERIFIED' if ('font_provenance' in rel_path or 'pdf_inspection' in rel_path) else 'VERIFIED'
        manifest['files'][clean_rel] = {
            'sha256': sha256,
            'bytes': size,
            'claim_level': claim
        }
        table_lines.append(f'| `{clean_rel}` | {size:,} B | `{sha256}` | `{claim}` |')
    else:
        print('Missing:', rel_path)

out_path = os.path.join(base_dir, 'UAT', 'artifacts', 'source_manifest_20260824.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

with open(out_path, 'rb') as f:
    mf_bytes = f.read()
    mf_sha256 = hashlib.sha256(mf_bytes).hexdigest().upper()
    mf_size = len(mf_bytes)
table_lines.append(f'| `UAT/artifacts/source_manifest_20260824.json` | {mf_size:,} B | `{mf_sha256}` | `VERIFIED` |')

with open(os.path.join(base_dir, 'UAT', 'artifacts', 'manifest_table.md'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(table_lines))

print('Manifest table successfully saved to manifest_table.md')
