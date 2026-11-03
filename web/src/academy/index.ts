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
import type {PedagogicalLesson} from './intro1'

export type {PedagogicalLesson} from './intro1'
export const academyLessons:Record<number,PedagogicalLesson>=Object.fromEntries([...intro1,...intro2,...intro3,...core1a,...core1b,...advancedNetworks,...nineCore,...coreExpansion1,...coreExpansion2,...coreExpansion3].map(lesson=>[lesson.id,lesson]))
export const academyTotal=Object.keys(academyLessons).length
