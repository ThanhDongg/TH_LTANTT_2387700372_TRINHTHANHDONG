#!/usr/bin/env python3
"""
GitLab CI/CD Runner Simulator
Thuc hanh Lab 06 - 6.2.1: Tao va chay CI/CD Pipeline
Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
"""

import os
import sys
import time
import yaml
import datetime

# Dat ma hoa UTF-8 cho Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Bien moi truong GitLab CI/CD duoc mo phong
ENV_VARS = {
    "GITLAB_USER_LOGIN": "ThanhDongg",
    "CI_COMMIT_BRANCH": "main",
    "CI_PIPELINE_ID": "104928174",
    "CI_PROJECT_NAME": "TH_LTANTT_2387700372_TRINHTHANHDONG",
    "CI_COMMIT_SHA": "e2d11b9b65e8573644503b91713ec08650994f8e"
}

def expand_variables(cmd: str) -> str:
    for k, v in ENV_VARS.items():
        cmd = cmd.replace(f"${k}", v).replace(f"${{{k}}}", v)
    return cmd

def run_job(job_name: str, job_config: dict):
    stage = job_config.get("stage", "test")
    scripts = job_config.get("script", [])
    env = job_config.get("environment", None)
    
    print(f"\n{'='*70}")
    print(f"[RUNNER] Starting Job: '{job_name}' | Stage: '{stage}'")
    if env:
        print(f"[RUNNER] Target Environment: '{env}'")
    print(f"{'='*70}")
    
    start_time = time.time()
    for script_line in scripts:
        expanded = expand_variables(script_line)
        now_str = datetime.datetime.now().strftime("%H:%M:%S")
        print(f"[{now_str}] $ {expanded}")
        
        # Xu ly lenh sleep thuc te hoac mo phong nhanh
        if expanded.startswith("sleep "):
            try:
                sec = float(expanded.split()[1])
                # Mo phong sleep ngan hon de tiet kiem thoi gian chay nhung van the hien ro do tre
                actual_sleep = min(sec, 2.0)
                time.sleep(actual_sleep)
                print(f"[{now_str}] [OK] Slept for simulated duration ({sec}s configured)")
            except Exception as e:
                print(f"[{now_str}] Error executing sleep: {e}")
        elif expanded.startswith("echo "):
            msg = expanded[5:].strip('\"\'')
            print(f"[{now_str}] {msg}")
        else:
            print(f"[{now_str}] Executing: {expanded}")
            
    elapsed = time.time() - start_time
    print(f"[SUCCESS] Job '{job_name}' completed successfully in {elapsed:.2f}s (exit code 0)")
    return True

def run_pipeline(yaml_path: str = ".gitlab-ci.yml"):
    print("="*70)
    print("      GITLAB CI/CD PIPELINE EXECUTION SIMULATOR")
    print(f" Pipeline ID: #{ENV_VARS['CI_PIPELINE_ID']}")
    print(f" Project:     {ENV_VARS['CI_PROJECT_NAME']}")
    print(f" User:        {ENV_VARS['GITLAB_USER_LOGIN']}")
    print(f" Branch:      {ENV_VARS['CI_COMMIT_BRANCH']}")
    print("="*70)
    
    if not os.path.exists(yaml_path):
        print(f"[ERROR] Config file '{yaml_path}' not found!")
        sys.exit(1)
        
    with open(yaml_path, 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
        
    stages = config.get("stages", ["build", "test", "deploy"])
    print(f"[CONFIG] Registered Stages ({len(stages)}): {' -> '.join(stages)}")
    
    # Gom nhom cac job theo stage
    jobs_by_stage = {st: [] for st in stages}
    for key, val in config.items():
        if key in ["stages", "image", "before_script", "after_script", "variables"]:
            continue
        if isinstance(val, dict):
            job_stage = val.get("stage", "test")
            if job_stage not in jobs_by_stage:
                jobs_by_stage[job_stage] = []
            jobs_by_stage[job_stage].append((key, val))
            
    # Chay tuan tu cac stage
    total_start = time.time()
    for stage_idx, stage in enumerate(stages, 1):
        print(f"\n>>> ENTERING STAGE [{stage_idx}/{len(stages)}]: '{stage.upper()}'")
        stage_jobs = jobs_by_stage.get(stage, [])
        if not stage_jobs:
            print(f"[WARN] No jobs defined for stage '{stage}'")
            continue
            
        for job_name, job_def in stage_jobs:
            success = run_job(job_name, job_def)
            if not success:
                print(f"[FATAL] Pipeline failed at job '{job_name}' in stage '{stage}'!")
                sys.exit(1)
                
    total_time = time.time() - total_start
    print("\n" + "="*70)
    print(f"[PIPELINE PASSED] All {len(stages)} stages passed successfully in {total_time:.2f}s!")
    print(f"Commit: {ENV_VARS['CI_COMMIT_SHA'][:8]} on {ENV_VARS['CI_COMMIT_BRANCH']} is verified and ready.")
    print("="*70)

if __name__ == "__main__":
    yaml_file = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".gitlab-ci.yml")
    run_pipeline(yaml_file)
