import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE, GAME_LINK } from '../constants/strings'
import { getStoredIsHighContrastMode } from './localStorage'
import { MAX_CHALLENGES } from '../constants/settings'

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHintMode: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHintMode ? '?' : ''}${isHardMode ? '*' : ''}\n` +
    `${GAME_LINK}\n` +
      generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode))
  )
}

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            case 'close':
              return tiles[2]
            case 'consonant':
              return tiles[3]
            case 'vowel':
              return tiles[4]
            default:
              return tiles[5]
          }
        })
        .join('')
    })
    .join('\n')
}

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩') // correct
  tiles.push(isHighContrastMode ? '🟦' : '🟨') // present
  tiles.push(isHighContrastMode ? '🟣' : '🟢') // close
  tiles.push('↕️') // consonant
  tiles.push('↔️') // vowel
  tiles.push(isDarkMode ? '⬛' : '⬜') // absent
  return tiles
}
