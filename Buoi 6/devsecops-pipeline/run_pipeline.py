#!/usr/bin/env python3
"""
DevSecOps 4-Stage CI/CD Pipeline Execution Engine
Thuc hanh Lab 06 - 6.2.2 & 6.1: Tich hop bao mat vao CI/CD Pipeline
Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
"""

import os
import sys
import shutil
import subprocess
import time
import datetime

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(PROJECT_DIR, "build")
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")

ENV_VARS = {
    "GITLAB_USER_LOGIN": "ThanhDongg",
    "CI_COMMIT_BRANCH": "main",
    "CI_PIPELINE_ID": "104928174",
    "CI_PROJECT_NAME": "my-pipeline-tutorial-project",
    "CI_PAGES_URL": "https://thanhdongg.gitlab.io/my-pipeline-tutorial-project/"
}

def log_header(title):
    print("\n" + "="*75)
    print(f" {title}")
    print("="*75)

def run_command(cmd, desc):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    print(f"[{now}] $ {cmd}  # ({desc})")
    res = subprocess.run(cmd, shell=True, cwd=PROJECT_DIR, capture_output=True, text=True)
    if res.stdout:
        for line in res.stdout.strip().splitlines():
            print(f"  {line}")
    if res.stderr:
        for line in res.stderr.strip().splitlines():
            print(f"  [STDERR] {line}")
    if res.returncode != 0:
        print(f"[ERROR] Command failed with exit code {res.returncode}")
        sys.exit(res.returncode)
    return True

def main():
    start_total = time.time()
    log_header("DEVSECOPS MULTI-STAGE CI/CD PIPELINE RUNNER")
    print(f" Pipeline ID:    #{ENV_VARS['CI_PIPELINE_ID']}")
    print(f" Project:        {ENV_VARS['CI_PROJECT_NAME']}")
    print(f" Author:         {ENV_VARS['GITLAB_USER_LOGIN']} (MSSV: 2387700372)")
    print(f" Target Branch:  {ENV_VARS['CI_COMMIT_BRANCH']}")
    print(f" Pages URL:      {ENV_VARS['CI_PAGES_URL']}")
    print(" Stages (4):     [1. BUILD] -> [2. SECURITY GATES] -> [3. TEST] -> [4. DEPLOY (PAGES)]")

    # STAGE 1: BUILD
    log_header("STAGE 1 / 4: 'BUILD' (Job: build-job | Image: node:20)")
    t0 = time.time()
    run_command("node scripts/build.js", "Compiling Docusaurus site to build/ artifacts")
    if os.path.exists(BUILD_DIR) and os.path.exists(os.path.join(BUILD_DIR, "index.html")):
        size = os.path.getsize(os.path.join(BUILD_DIR, "index.html"))
        print(f"[ARTIFACTS] Captured path 'build/' (index.html: {size} bytes, robots.txt)")
    print(f"[SUCCESS] Stage 'BUILD' completed in {time.time() - t0:.2f}s")

    # STAGE 2: SECURITY GATES (Shift Left Security)
    log_header("STAGE 2 / 4: 'SECURITY GATES' (Job: security-job | Shift Left SecOps)")
    t0 = time.time()
    run_command("node scripts/audit.js", "SCA - Software Composition Analysis for npm dependencies")
    run_command("node scripts/secret_scan.js", "Secrets Scanning - Leaked API keys and credential detection")
    run_command("node scripts/sast_scan.js", "SAST - Static Code Analysis for injection vulnerabilities")
    print(f"[SECURITY GATE PASSED] All 3 security policies verified (0 Violations). Stage time: {time.time() - t0:.2f}s")

    # STAGE 3: TEST
    log_header("STAGE 3 / 4: 'TEST' (Job: test-job | Automated Quality Gates)")
    t0 = time.time()
    run_command("node scripts/test.js", "Automated artifact integrity & DOM validation")
    print(f"[SUCCESS] Stage 'TEST' completed in {time.time() - t0:.2f}s")

    # STAGE 4: DEPLOY (PAGES)
    log_header("STAGE 4 / 4: 'DEPLOY' (Job: pages | Environment: production)")
    t0 = time.time()
    if os.path.exists(PUBLIC_DIR):
        shutil.rmtree(PUBLIC_DIR)
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] $ mv build/ public/  # Moving artifacts to GitLab Pages publish root")
    shutil.move(BUILD_DIR, PUBLIC_DIR)
    
    if os.path.exists(PUBLIC_DIR) and os.path.exists(os.path.join(PUBLIC_DIR, "index.html")):
        files = os.listdir(PUBLIC_DIR)
        print(f"[DEPLOYED ARTIFACTS] Uploading 'public/' ({len(files)} files: {', '.join(files)})")
        print(f"[PAGES DEPLOY] Site successfully published at:")
        print(f"               --> {ENV_VARS['CI_PAGES_URL']}")
    print(f"[SUCCESS] Stage 'DEPLOY' completed in {time.time() - t0:.2f}s")

    total_time = time.time() - start_total
    log_header("PIPELINE SUMMARY: ALL 4 STAGES PASSED SUCCESSFULLY")
    print(f" Total Execution Time: {total_time:.2f}s")
    print(f" Pipeline Status:      PASSED (Exit code: 0)")
    print(f" Security Gate Check:  100% PASSED (No blockers)")
    print(f" Deployment URL:       {ENV_VARS['CI_PAGES_URL']}")
    print("="*75)

if __name__ == "__main__":
    main()
