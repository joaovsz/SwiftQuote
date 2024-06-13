import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import minimalLogo from '../../assets/minimalLogoWhite.svg';
import styles from './Header.module.css';
const Header = () => {
    const menu = useRef<Menu>(null);
    const navigate = useNavigate();

    const items = [
        {
            label: 'Cotações',
            icon: 'ri-file-list-line',
            command: () => navigate("/cotacoes")
        },
        {
            label: 'Fornecedores',
            icon: 'ri-contacts-line',
            command: () => navigate("/fornecedores")
        }
    ];

    const userMenuItems = [
        {
            label: 'Sair',
            icon: 'ri-logout-box-line',
            command: () => { alert('Saindo...'); }
        }
    ];

    const start = <img alt="logo" src={minimalLogo} height="30" className="mr-2" />;

    const end = (
        <>
            <Menu model={userMenuItems} popup ref={menu} id="popup_menu" />
            <Button
                icon="ri-user-line"
                className="p-button-rounded p-button-secondary p-button-text"
                onClick={(event) => menu.current?.toggle(event)}
            />
        </>
    );

    return (
        <Menubar model={items} start={start} end={end} className={styles.header} />
    );
};

export default Header;
