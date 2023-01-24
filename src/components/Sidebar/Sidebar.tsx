import {FC, Fragment, useEffect, useRef, useState} from "react";
import Logo from "../../assets/Black.png";
import "./Sidebar.css"
import {useNavigate} from "react-router-dom";
import {MobileNav} from "./MobileVersion/MobileNav";
import useWindowDimensions from "../../utils/useWindowDimensions";

const menuItems: Item[] = [
    {
        name: "Account",
        icon: "manage_accounts",
        // items: ["MyStudio"],
    },
    {
        name: "MyStudio",
        icon: "apps",
    },
];

type Item = {
    name: string;
    icon: string;
    items?: string[] | undefined;
};

const Icon = ({icon}: { icon: string }) => (
    <span className="material-symbols-outlined">{icon}</span>
);

const NavHeader = () => {
    const navigate = useNavigate();
    const onMenuButtonHandler = () => {
        console.log('Menu')
    };

    return (
        <header className="sidebar-header">
            <button type="button" onClick={onMenuButtonHandler}>
                <Icon icon="menu"/>
            </button>
            <button onClick={() => navigate('/')}>
                <img src={Logo} alt="logo" style={{width: '139px'}}/>
            </button>
        </header>
    );
}

type ButtonProps = {
    onClick: (item: string) => void;
    name: string;
    icon?: string;
    isActive: boolean;
    hasSubNav?: boolean;
};

const NavButton: FC<ButtonProps> = ({
                                        onClick,
                                        name,
                                        icon,
                                        isActive,
                                        hasSubNav,
                                    }) => (
    <button
        type="button"
        onClick={() => onClick(name)}
        className={isActive ? "active" : ""}
    >
        {icon && <Icon icon={icon}/>}
        <span>{name}</span>
        {hasSubNav && <Icon icon={`expand_${isActive ? "less" : "more"}`}/>}
    </button>
);

type SubMenuProps = {
    item: Item;
    activeItem: string;
    handleClick: (args0: string) => void;
};

const SubMenu: FC<SubMenuProps> = ({item, activeItem, handleClick}) => {
    const navRef = useRef<HTMLDivElement>(null);

    const isSubNavOpen = (item: string, items: string[] | undefined) =>
        items?.some((i) => i === activeItem) || item === activeItem;

    return (
        <div
            className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
            style={{
                height: !isSubNavOpen(item.name, item.items)
                    ? 0
                    : navRef.current?.clientHeight,
            }}
        >
            <div ref={navRef} className="sub-nav-inner">
                {item?.items?.map((subItem) => (
                    <NavButton
                        key={subItem}
                        onClick={handleClick}
                        name={subItem}
                        isActive={activeItem === subItem}
                    />
                ))}
            </div>
        </div>
    );
};

export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>("");
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    const {width} = useWindowDimensions();

    useEffect(() => {
        if (width <= 1064) {
            setIsMobile(true)
        }
    }, []);

    const handleClick = (item: string) => {
        setActiveItem(item !== activeItem ? item : "");
        navigate(item)
    };

    return (
        isMobile
            ? <MobileNav/>
            : <aside className="sidebar">
                <NavHeader/>
                {menuItems.map((item) => (
                    <Fragment key={item.name}>
                        {!item.items && (
                            <NavButton
                                onClick={handleClick}
                                name={item.name}
                                icon={item.icon}
                                isActive={activeItem === item.name}
                                hasSubNav={!!item.items}
                            />
                        )}
                        {item.items && (
                            <>
                                <NavButton

                                    onClick={handleClick}
                                    name={item.name}
                                    icon={item.icon}
                                    isActive={activeItem === item.name}
                                    hasSubNav={!!item.items}
                                />
                                <SubMenu
                                    activeItem={activeItem}
                                    handleClick={handleClick}
                                    item={item}
                                />
                            </>
                        )}
                    </Fragment>
                ))}
            </aside>
    );
};