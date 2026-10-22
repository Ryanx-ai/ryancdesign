"use client";

import { PuffletWebsite, PuffletDeployment, PuffletMascots } from "./pufflet-study";
import { PhingsStudy } from "./phings-study";
import { LunaVaultStudy } from "./luna-vault-study";
import { EurekaStudy } from "./eureka-study";
import type { StudyKind } from "@/lib/case-blocks";

const studies = { pufflet:PuffletWebsite, "pufflet-app":PuffletDeployment, "pufflet-mascots":PuffletMascots, phings:PhingsStudy, luna:LunaVaultStudy, eureka:EurekaStudy };
export function DesignStudy({kind}:{kind:StudyKind}) { const Study=studies[kind]; return <div className={`design-study study-${kind}`}><Study/></div>; }
