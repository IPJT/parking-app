// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string
    colors: {
      scheme: {
        lightShades: string //Use this color as the background for your dark-on-light designs, or the text color of an inverted design.
        lightAccent: string //Accent colors can be used to bring attention to design elements by contrasting with the rest of the palette
        mainBrand: string //This color should be eye-catching but not harsh. It can be liberally applied to your layout as its main identity.
        darkAccent: string //Another accent color to consider. Not all colors have to be used - sometimes a simple color scheme works best.
        darkShades: string //Use as the text color for dark-on-light designs, or as the background for inverted designs.
      }
      semantics: {
        primary: string
        info: string
        success: string
        warning: string
        danger: string
      }
      grey: string
    }
  }
}
