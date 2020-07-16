import React, { useEffect } from 'react'

import styles from './Home.module.scss'

export default () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#010101'
    return () => {
      document.body.style.backgroundColor = 'unset'
    }
  })

  return (
    <>
      <div className={styles.quoteBox}>
        <div className={styles.quote}>
          The final aim and reason of all music is nothing other than the
          glorification of God and the refreshment of the human spirit.
        </div>
        <div className={styles.bach}>
          Johann Sebastian Bach
        </div>
      </div>
      <picture className={styles.background}>
        <source
          media='(orientation: portrait) and (min-width: 834px)'
          srcSet='/images/steinway-portrait-huge.jpg'
        />
        <source
          media='(orientation: portrait) and (min-width: 768px)'
          srcSet='/images/steinway-portrait-large.jpg'
        />
        <source
          media='(orientation: portrait) and (min-width: 411px)'
          srcSet='/images/steinway-portrait-medium.jpg'
        />
        <source
          media='(orientation: landscape) and (min-width: 1920px)'
          srcSet='/images/steinway-landscape-huge.jpg'
        />
        <source
          media='(orientation: landscape) and (min-width: 1024px)'
          srcSet='/images/steinway-landscape-large.jpg'
        />
        <source
          media='(orientation: landscape) and (min-width: 711px)'
          srcSet='/images/steinway-landscape-medium.jpg'
        />
        <source
          media='(orientation: landscape) and (min-width: 640px)'
          srcSet='/images/steinway-landscape-small.jpg'
        />
        <img alt='Steinway' src='/images/steinway-portrait-small.jpg' />
      </picture>
    </>
  )
}
