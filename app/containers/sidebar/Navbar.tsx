import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/Routes';
import { Divider, InputText } from 'src/elements';

type Props = {};

const Navbar: FC<Props> = (props) => {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const [navItems, setNavItems] = useState(AppRoutes);
    useEffect(() => {
        let filtered =
            searchString.length == 0
                ? AppRoutes
                : AppRoutes.filter((item) => {
                      return item.label
                          .toLowerCase()
                          .includes(searchString.toLocaleLowerCase());
                  });
        setNavItems(filtered);
    }, [searchString]);

    return (
        <>
            <div className="navbar">
                <div className="nav-search">
                    <InputText
                        value={searchString}
                        placeholder=""
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                </div>
                {navItems.map((item, index) => {
                    return (
                        item.visible != false && (
                            <div
                                className="nav-item"
                                key={`nav-${index}`}
                                onClick={() => navigate(item.routePath)}
                            >
                                {item.label}
                            </div>
                        )
                    );
                })}
            </div>
        </>
    );
};

export default React.memo(Navbar);
