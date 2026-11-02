import {intro1} from './intro1'
import {intro2} from './intro2'
import {intro3} from './intro3'
import type {PedagogicalLesson} from './intro1'

export type {PedagogicalLesson} from './intro1'
export const academyLessons:Record<number,PedagogicalLesson>=Object.fromEntries([...intro1,...intro2,...intro3].map(lesson=>[lesson.id,lesson]))
export const academyTotal=Object.keys(academyLessons).length
