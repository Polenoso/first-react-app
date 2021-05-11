import React from 'react';

const Header = ({onClickAdd}) => (<div className="header-content">
    <div className="hedader-title-text">Mis vídeos favoritos</div>
    <input type="button" onClick={onClickAdd} value="Añadir Video" className="header-button-add"/>
</div>)

export default Header;