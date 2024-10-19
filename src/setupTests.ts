import * as sinonChrome from "sinon-chrome"
import "@testing-library/jest-dom"

beforeAll(function () {
  window.chrome = sinonChrome as unknown as typeof chrome
})
