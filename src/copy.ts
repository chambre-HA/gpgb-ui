/** Standard UI strings. Chinese is primary; components default to 'zh' and accept `lang`. See "Content & voice" in DESIGN_SYSTEM.md. */
export type Lang = 'zh' | 'en'

export const labels = {
  zh: {
    cancel: '取消', confirm: '确认', save: '保存', delete: '删除', close: '关闭', retry: '重试', back: '返回', next: '下一步',
    done: '完成', loading: '加载中', search: '搜索', menu: '菜单', openMenu: '打开菜单', mainNav: '主导航', breadcrumb: '当前位置',
    steps: '步骤', language: '语言', signIn: '登录', signOut: '退出登录', settings: '设置', help: '帮助', workspace: '工作区',
    switchWorkspace: '切换工作区', account: '账户', viewer: '仅查看', copyright: '版权所有',
    breatheIn: '吸', breatheOut: '呼', breatheHint: '等待时，跟着圆圈慢慢呼吸。', waitUsually: '通常', waitLonger: '比平时久一点，仍在进行',
  },
  en: {
    cancel: 'Cancel', confirm: 'Confirm', save: 'Save', delete: 'Delete', close: 'Close', retry: 'Try again', back: 'Back', next: 'Next',
    done: 'Done', loading: 'Loading', search: 'Search', menu: 'Menu', openMenu: 'Open menu', mainNav: 'Main navigation', breadcrumb: 'Breadcrumb',
    steps: 'Steps', language: 'Language', signIn: 'Sign in', signOut: 'Sign out', settings: 'Settings', help: 'Help', workspace: 'Workspace',
    switchWorkspace: 'Switch workspace', account: 'Account', viewer: 'View only', copyright: 'All rights reserved',
    breatheIn: 'in', breatheOut: 'out', breatheHint: 'While you wait, breathe slowly with the circle.', waitUsually: 'usually ', waitLonger: 'taking a little longer than usual, still going',
  },
} as const

export type LabelKey = keyof typeof labels.zh
export const t = (lang: Lang | undefined, key: LabelKey) => labels[lang ?? 'zh'][key]
