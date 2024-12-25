export interface MenuItem {
    title?: string;
    icon?: string;
    link?: string;
    color?: string;
    expanded?: boolean;
    subMenu?: MenuItem[];
  }
  
  export type Menu = MenuItem[];
  