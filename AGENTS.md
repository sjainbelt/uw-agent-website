# AI Agent Guardrails (uw-agent-website)

## Mission
Maintain compatibility with the Belt 3-service architecture while allowing safe internal refactors.

## Architecture Invariants (Do Not Break)
1. Public URLs and public paths stay stable:
   - https://api.beltdev.com
   - https://app.beltdev.com (tenant user portal)
   - https://tenant.beltdev.com (tenant admin portal)
   - https://ops.beltdev.com and https://console.beltdev.com (ops)
2. Public API contract remains backward compatible:
   - /discovery/v1/resolve
   - /api/platform/*
   - /api/apps/{app}/*
3. Ownership split is enforced:
   - platform-core owns /api/apps/{app}/agent/* plus tenant/auth/discovery/billing concerns.
   - apps-runtime owns app business logic for /api/apps/underwrite/* and /api/apps/noodle/* (excluding platform-owned agent routes).
4. Internal renames/reorgs are allowed, but external host/path/query contracts are not changed in this phase.

## Repo Ownership
- Service/component: website/frontend
- This repo owns: UnderWrite website frontend and deployment wiring compatible with platform/gateway contracts.
- This repo must not own: Changing backend public API contracts from frontend code assumptions.

## Required Workflow for Any Non-Trivial Change
1. Update/verify contracts first in `belt-platform-contracts` when API shapes or route constants change.
2. Keep changes additive where possible; preserve existing response fields and auth behavior.
3. Add or update compatibility tests for any changed behavior.
4. Run repo test suite and targeted auth/discovery/app flow checks.
5. Document operational impact and rollback steps in PR notes.

## Compatibility Checklist
- No new external domain names required.
- No required client URL migration.
- Existing token/enrollment/refresh flows remain valid.
- Existing host-based portal behavior remains valid.
- Existing billing and provisioning flows remain valid.

## Verification Baseline
Run: frontend build/test plus login and auth redirect smoke checks.

## Forbidden Changes Without Explicit Migration Plan
- Removing or renaming public endpoints used by existing clients.
- Moving platform-owned agent endpoints into app repos.
- Reintroducing legacy direct public routing to app-specific backend services.
- Introducing hard-coded legacy service hosts in clients or frontend apps.
