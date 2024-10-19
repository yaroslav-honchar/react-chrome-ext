export interface IPage {
  title: string
  href: string
}

export interface IPageGroup {
  title: string
  originUrl: string
  icon: string
  pages: IPage[]
}
