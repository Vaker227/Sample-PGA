
interface INavLinkMap {
    label: string,
    path: string,
    to: string
}

interface IDropdownMap {
    label: string;
    icon: React.ReactNode;
    list: INavLinkMap[]
}


export type ISidebarMap = IDropdownMap[]