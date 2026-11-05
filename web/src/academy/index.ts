import {intro1} from './intro1'
import {intro2} from './intro2'
import {intro3} from './intro3'
import {core1a} from './core1a'
import {core1b} from './core1b'
import {advancedNetworks} from './advancedNetworks'
import {nineCore} from './nineCore'
import {coreExpansion1} from './coreExpansion1'
import {coreExpansion2} from './coreExpansion2'
import {coreExpansion3} from './coreExpansion3'
import {completedRED} from './completedRED'
import {completedSEG} from './completedSEG'
import {completedSO} from './completedSO'
import {completedPOR} from './completedPOR'
import {completedGOV} from './completedGOV'
import {completedBD} from './completedBD'
import {completedENG} from './completedENG'
import {completedLOG} from './completedLOG'
import {completedLEG} from './completedLEG'
import {pedagogicalBoosts} from './pedagogicalBoosts'
import {recallSupplement} from './recallSupplement'
import {rewrittenInfrastructure} from './rewrittenInfrastructure'
import {rewrittenFoundations} from './rewrittenFoundations'
import {rewrittenPractice} from './rewrittenPractice'
import {rewrittenOps} from './rewrittenOps'
import {rewrittenPlanning} from './rewrittenPlanning'
import {rewrittenIntegration} from './rewrittenIntegration'
import {beginnerNetwork} from './beginnerNetwork'
import {beginnerNetworkNext} from './beginnerNetworkNext'
import {beginnerCrossA} from './beginnerCrossA'
import type {PedagogicalLesson} from './intro1'

export type {PedagogicalLesson} from './intro1'
export const academyLessons:Record<number,PedagogicalLesson>=Object.fromEntries([...intro1,...intro2,...intro3,...core1a,...core1b,...advancedNetworks,...nineCore,...coreExpansion1,...coreExpansion2,...coreExpansion3,...completedRED,...completedSEG,...completedSO,...completedPOR,...completedGOV,...completedBD,...completedENG,...completedLOG,...completedLEG].map(lesson=>{
 const patch=beginnerNetwork[lesson.id]||beginnerNetworkNext[lesson.id]||beginnerCrossA[lesson.id]||rewrittenInfrastructure[lesson.id]||rewrittenFoundations[lesson.id]||rewrittenPractice[lesson.id]||rewrittenOps[lesson.id]||rewrittenPlanning[lesson.id]||rewrittenIntegration[lesson.id]
 const base={...lesson,...patch}
 const more=patch?undefined:pedagogicalBoosts[lesson.id]
 const card=patch?undefined:recallSupplement[lesson.id]
 const review=card&&!base.review.some(c=>c.ask===card.ask)?[...base.review,card]:base.review
 const steps=more?base.steps.map((step,i)=>i===1?{...step,body:more+'\n\n'+step.body}:step):base.steps
 return [base.id,{...base,steps,review}]
}))
export const academyTotal=Object.keys(academyLessons).length
