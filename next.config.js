const withTypescript = require('@zeit/next-typescript')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withFonts = require('next-fonts')

module.exports = withTypescript(
  withFonts(
    withImages(
      withCss(
        withSass()
      )
    )
  )
)