import React, { FC } from 'react';
import { Avatar, AvatarGroup, Badge } from 'src/elements';
import img1 from '../../../public/images/avatar/amyelsner.png';
import img2 from '../../../public/images/avatar/asiyajavayant.png';
import img3 from '../../../public/images/avatar/ionibowcher.png';
import img4 from '../../../public/images/avatar/onyamalimba.png';
import img5 from '../../../public/images/avatar/walter.jpg';
import img6 from '../../../public/images/avatar/xuxuefeng.png';
import { useNavigate } from 'react-router-dom';
import { ObjectUtils } from 'src/utils/Utils';

const AvatarPage: FC = () => {
    const navigate = useNavigate();

    const media = [
        {url: img1, type: 'image'},
        {url: img2, type: 'image'},
        {url: img3, type: 'image'},
        {url: img4, type: 'image'},
        {url: img5, type: 'image'},
        {url: img6, type: 'image'}
    ]

    return (
        <div>
            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Label</h5>
                        <Avatar label="P" className="mr-2" size="xlarge"/>
                        <Avatar
                            label="V"
                            className="mr-2"
                            size="large"
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#ffffff',
                            }}
                        />
                        <Avatar
                            label="U"
                            className="mr-2"
                            style={{
                                backgroundColor: '#9c27b0',
                                color: '#ffffff',
                            }}
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Label - Circle</h5>
                        <Avatar
                            label="P"
                            className="mr-2"
                            size="xlarge"
                            shape="circle"
                        />
                        <Avatar
                            label="V"
                            className="mr-2"
                            size="large"
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#ffffff',
                            }}
                            shape="circle"
                        />
                        <Avatar
                            label="U"
                            className="mr-2"
                            style={{
                                backgroundColor: '#9c27b0',
                                color: '#ffffff',
                            }}
                            shape="circle"
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Label - Badge</h5>
                        <Avatar
                            label="U"
                            size="xlarge"
                            className="cs-overlay-badge"
                            style={{
                                backgroundColor: '#4caf4f',
                                color: '#ffffff',
                            }}
                        >
                            <Badge value="4" />
                        </Avatar>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Icon</h5>
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            size="xlarge"
                        />
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            size="large"
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#ffffff',
                            }}
                        />
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            style={{
                                backgroundColor: '#9c27b0',
                                color: '#ffffff',
                            }}
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Icon - Circle</h5>
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            size="xlarge"
                            shape="circle"
                        />
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            size="large"
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#ffffff',
                            }}
                            shape="circle"
                        />
                        <Avatar
                            icon="csi csi-user"
                            className="mr-2"
                            style={{
                                backgroundColor: '#9c27b0',
                                color: '#ffffff',
                            }}
                            shape="circle"
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Icon - Badge</h5>
                        <Avatar
                            className="cs-overlay-badge"
                            icon="csi csi-user"
                            size="xlarge"
                        >
                            <Badge value="4" />{' '}
                        </Avatar>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Image</h5>
                        <div onClick={() => {
                                navigate(`/photos/${ObjectUtils.getImageId(media[0].url)}`,
                                    {state: {
                                        id: ObjectUtils.getImageId(media[0].url),
                                        currentItem: media[0],
                                        media: media,
                                        navigatedFrom: '/avatar',
                                    }})
                                }} >
                        <Avatar
                            image={img1}
                            disableRightClick={true}
                            className="mr-2"
                            size="xlarge"
                            shape="circle"
                        />
                        </div>
                        <Avatar
                            image={img2}
                            className="mr-2"
                            size="large"
                            shape="circle"
                        />
                        <Avatar
                            image={img3}
                            className="mr-2"
                            shape="circle"
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card">
                        <h5>Avatar Group</h5>
                        <AvatarGroup className="mb-3">
                            <Avatar
                                image={img4}
                                size="large"
                                shape="circle"
                            />
                            <Avatar
                                image={img5}
                                size="large"
                                shape="circle"
                            />
                            <Avatar
                                image={img6}
                                size="large"
                                shape="circle"
                            />
                            <Avatar
                                label="+2"
                                shape="circle"
                                size="large"
                                style={{
                                    backgroundColor: '#9c27b0',
                                    color: '#ffffff',
                                }}
                            />
                        </AvatarGroup>
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="card"
                        onClick={() => {
                            navigate(`/photos/${ObjectUtils.getImageId(media[4].url)}`,
                                {state: {
                                    id: ObjectUtils.getImageId(media[4].url),
                                    currentItem: media[4],
                                    media: media,
                                    navigatedFrom: '/avatar',
                                }})
                            }}>
                        <h5>Image - Badge</h5>
                        <Avatar
                            className="cs-overlay-badge"
                            image={img5}
                            size="xlarge"
                        >
                            <Badge value="4" severity="danger" />
                        </Avatar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AvatarPage);
