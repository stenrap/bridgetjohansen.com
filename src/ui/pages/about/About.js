import React from 'react'

import styles from './About.module.scss'

const STARTING_YEAR = 1989

export default () => {
  const today = new Date()
  const total = today.getFullYear() - STARTING_YEAR

  return (
    <div className={styles.about}>
      <div className={styles.bridget}>
        <div className={styles.aboutHeader}>
          Professional
        </div>
        <img alt='Bridget Johansen' className={styles.bridgetPhoto} src='/images/bridget.jpg' />
        <div className={styles.explanation}>
          <p>
            Bridget McBride Johansen, Nationally Certified Teacher of Music (NCTM), has offered private
            piano instruction for {total} years.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <div className={styles.usu}>
        <div className={styles.aboutHeader}>
          Education
        </div>
        <img alt='Utah State University' className={styles.usuPhoto} src='/images/usu.jpg' />
        <div className={styles.explanation}>
          <p>
            Bridget earned a bachelor's degree in piano pedagogy from Utah State University.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  )
}
