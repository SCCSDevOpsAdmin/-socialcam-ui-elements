import React, { useState } from 'react';
import { Badge, Button } from 'src/elements';

type Props = {};

const ButtonsPage = (props: Props) => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const onLoadingClick1 = () => {
        setLoading1(true);

        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    };

    const onLoadingClick2 = () => {
        setLoading2(true);

        setTimeout(() => {
            setLoading2(false);
        }, 2000);
    };
    return (
        <div>
            <div>
                <Button
                    icon="csi csi-check"
                    iconPos="right"
                    className="cs-overlay-badge"
                    badge={10}
                >
                    <Badge severity="danger"></Badge>
                </Button>
            </div>
            <Button
                variant="raised"
                className=""
                label="Continue with Facebook"
                loadingIcon="csi csi-spin csi-sun"
                icon="csi csi-facebook"
                iconPos="left"
            />
            <Button
                variant="raised"
                className=""
                label="Continue with Facebook"
                disabled={true}
            />

            <Button
                variant="raised"
                className=""
                label="Continue with Facebook"
                icon="csi csi-google"
            />
            <Button
                variant="raised"
                className=""
                label="Continue with Facebook"
                icon="csi csi-google"
                disabled={true}
            />
            <div>
                <div className="content-section implementation button-demo">
                    <div className="card">
                        <h5>Basic</h5>
                        <Button label="Submit" />
                        <Button label="Disabled" disabled />
                        <Button label="Link" className="cs-button-link" />

                        <h5>Icons</h5>
                        <Button icon="csi csi-check" aria-label="Submit" />
                        <Button label="Submit" icon="csi csi-check" />
                        <Button
                            label="Submit"
                            icon="csi csi-check"
                            iconPos="right"
                        />

                        <h5>Loading</h5>
                        <Button loading />
                        <Button label="Submit" loading />
                        <Button label="Submit" iconPos="right" loading />
                        <Button
                            label="Submit"
                            icon="csi csi-check"
                            loading={loading1}
                            onClick={onLoadingClick1}
                        />
                        <Button
                            label="Submit"
                            loading={loading2}
                            onClick={onLoadingClick2}
                        />

                        <h5>Severities</h5>
                        <Button label="Main" />
                        <Button label="Primary" className="cs-button-primary" />
                        <Button
                            label="Secondary"
                            className="cs-button-secondary"
                        />
                        <Button label="Black" className="cs-button-black" />
                        <Button label="White" className="cs-button-white" />
                        <Button label="Success" className="cs-button-success" />
                        <Button label="Info" className="cs-button-info" />
                        <Button label="Warning" className="cs-button-warning" />
                        <Button label="Help" className="cs-button-help" />
                        <Button label="Danger" className="cs-button-danger" />

                        <h5>Raised Buttons</h5>
                        <Button label="Main" className="cs-button-raised" />
                        <Button
                            label="Primary"
                            className="cs-button-raised cs-button-primary"
                        />
                        <Button
                            label="Secondary"
                            className="cs-button-raised cs-button-secondary"
                        />
                        <Button
                            label="Black"
                            className="cs-button-raised cs-button-black"
                        />
                        <Button
                            label="White"
                            className="cs-button-raised cs-button-white"
                        />
                        <Button
                            label="Success"
                            className="cs-button-raised cs-button-success"
                        />
                        <Button
                            label="Info"
                            className="cs-button-raised cs-button-info"
                        />
                        <Button
                            label="Warning"
                            className="cs-button-raised cs-button-warning"
                        />
                        <Button
                            label="Help"
                            className="cs-button-raised cs-button-help"
                        />
                        <Button
                            label="Danger"
                            className="cs-button-raised cs-button-danger"
                        />

                        <h5>Rounded Buttons</h5>
                        <Button label="Main" className="cs-button-rounded" />
                        <Button
                            label="Primary"
                            className="cs-button-rounded cs-button-primary"
                        />
                        <Button
                            label="Secondary"
                            className="cs-button-rounded cs-button-secondary"
                        />
                        <Button
                            label="Black"
                            className="cs-button-rounded cs-button-black"
                        />
                        <Button
                            label="White"
                            className="cs-button-rounded cs-button-white"
                        />
                        <Button
                            label="Success"
                            className="cs-button-rounded cs-button-success"
                        />
                        <Button
                            label="Info"
                            className="cs-button-rounded cs-button-info"
                        />
                        <Button
                            label="Warning"
                            className="cs-button-rounded cs-button-warning"
                        />
                        <Button
                            label="Help"
                            className="cs-button-rounded cs-button-help"
                        />
                        <Button
                            label="Danger"
                            className="cs-button-rounded cs-button-danger"
                        />

                        <h5>Text Buttons</h5>
                        <Button label="Main" className="cs-button-text" />
                        <Button
                            label="Primary"
                            className="cs-button-primary cs-button-text"
                        />
                        <Button
                            label="Secondary"
                            className="cs-button-secondary cs-button-text"
                        />
                        <Button
                            label="Black"
                            className="cs-button-black cs-button-text"
                        />
                        <Button
                            label="White"
                            className="cs-button-white cs-button-text"
                        />
                        <Button
                            label="Success"
                            className="cs-button-success cs-button-text"
                        />
                        <Button
                            label="Info"
                            className="cs-button-info cs-button-text"
                        />
                        <Button
                            label="Warning"
                            className="cs-button-warning cs-button-text"
                        />
                        <Button
                            label="Help"
                            className="cs-button-help cs-button-text"
                        />
                        <Button
                            label="Danger"
                            className="cs-button-danger cs-button-text"
                        />
                        <Button
                            label="Plain"
                            className="cs-button-text cs-button-plain"
                        />

                        <h5>Raised Text Buttons</h5>
                        <Button
                            label="Main"
                            className="cs-button-raised cs-button-text"
                        />
                        <Button
                            label="Primary"
                            className="cs-button-raised cs-button-primary cs-button-text"
                        />
                        <Button
                            label="Secondary"
                            className="cs-button-raised cs-button-secondary cs-button-text"
                        />
                        <Button
                            label="Black"
                            className="cs-button-raised cs-button-black cs-button-text"
                        />
                        <Button
                            label="White"
                            className="cs-button-raised cs-button-white cs-button-text"
                        />
                        <Button
                            label="Success"
                            className="cs-button-raised cs-button-success cs-button-text"
                        />
                        <Button
                            label="Info"
                            className="cs-button-raised cs-button-info cs-button-text"
                        />
                        <Button
                            label="Warning"
                            className="cs-button-raised cs-button-warning cs-button-text"
                        />
                        <Button
                            label="Help"
                            className="cs-button-raised cs-button-help cs-button-text"
                        />
                        <Button
                            label="Danger"
                            className="cs-button-raised cs-button-danger cs-button-text"
                        />
                        <Button
                            label="Plain"
                            className="cs-button-raised cs-button-text cs-button-plain"
                        />

                        <h5>Outlined Buttons</h5>
                        <Button label="Main" className="cs-button-outlined" />
                        <Button
                            label="Primary"
                            className="cs-button-outlined cs-button-primary"
                        />
                        <Button
                            label="Secondary"
                            className="cs-button-outlined cs-button-secondary"
                        />
                        <Button
                            label="Black"
                            className="cs-button-outlined cs-button-black"
                        />
                        <Button
                            label="White"
                            className="cs-button-outlined cs-button-white"
                        />
                        <Button
                            label="Success"
                            className="cs-button-outlined cs-button-success"
                        />
                        <Button
                            label="Info"
                            className="cs-button-outlined cs-button-info"
                        />
                        <Button
                            label="Warning"
                            className="cs-button-outlined cs-button-warning"
                        />
                        <Button
                            label="Help"
                            className="cs-button-outlined cs-button-help"
                        />
                        <Button
                            label="Danger"
                            className="cs-button-outlined cs-button-danger"
                        />

                        <h5>Rounded Icon Buttons</h5>
                        <Button
                            icon="csi csi-check"
                            className="cs-button-rounded"
                            aria-label="Filter"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-primary"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-secondary"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-black"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-search"
                            className="cs-button-rounded cs-button-success"
                            aria-label="Search"
                        />
                        <Button
                            icon="csi csi-user"
                            className="cs-button-rounded cs-button-info"
                            aria-label="User"
                        />
                        <Button
                            icon="csi csi-bell"
                            className="cs-button-rounded cs-button-warning"
                            aria-label="Notification"
                        />
                        <Button
                            icon="csi csi-heart"
                            className="cs-button-rounded cs-button-help"
                            aria-label="Favorite"
                        />
                        <Button
                            icon="csi csi-times"
                            className="cs-button-rounded cs-button-danger"
                            aria-label="Cancel"
                        />

                        <h5>Rounded Text Icon Buttons</h5>
                        <Button
                            icon="csi csi-check"
                            className="cs-button-rounded cs-button-text"
                            aria-label="Submit"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-primary cs-button-text"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-secondary cs-button-text"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-search"
                            className="cs-button-rounded cs-button-black cs-button-text"
                            aria-label="Search"
                        />
                        <Button
                            icon="csi csi-search"
                            className="cs-button-rounded cs-button-success cs-button-text"
                            aria-label="Search"
                        />

                        <Button
                            icon="csi csi-user"
                            className="cs-button-rounded cs-button-info cs-button-text"
                            aria-label="User"
                        />
                        <Button
                            icon="csi csi-bell"
                            className="cs-button-rounded cs-button-warning cs-button-text"
                            aria-label="Notification"
                        />
                        <Button
                            icon="csi csi-heart"
                            className="cs-button-rounded cs-button-help cs-button-text"
                            aria-label="Favorite"
                        />
                        <Button
                            icon="csi csi-times"
                            className="cs-button-rounded cs-button-danger cs-button-text"
                            aria-label="Cancel"
                        />
                        <Button
                            icon="csi csi-filter"
                            className="cs-button-rounded cs-button-text cs-button-plain"
                            aria-label="Filter"
                        />

                        <h5>Rounded and Outlined Icon Buttons</h5>
                        <Button
                            icon="csi csi-check"
                            className="cs-button-rounded cs-button-outlined"
                            aria-label="Submit"
                        />
                        <Button
                            icon="csi csi-bookmark"
                            className="cs-button-rounded cs-button-secondary cs-button-outlined"
                            aria-label="Bookmark"
                        />
                        <Button
                            icon="csi csi-search"
                            className="cs-button-rounded cs-button-success cs-button-outlined"
                            aria-label="Search"
                        />
                        <Button
                            icon="csi csi-user"
                            className="cs-button-rounded cs-button-info cs-button-outlined"
                            aria-label="User"
                        />
                        <Button
                            icon="csi csi-bell"
                            className="cs-button-rounded cs-button-warning cs-button-outlined"
                            aria-label="Notification"
                        />
                        <Button
                            icon="csi csi-heart"
                            className="cs-button-rounded cs-button-help cs-button-outlined"
                            aria-label="Favorite"
                        />
                        <Button
                            icon="csi csi-times"
                            className="cs-button-rounded cs-button-danger cs-button-outlined"
                            aria-label="Cancel"
                        />

                        <h5>Badges</h5>
                        <Button type="button" label="Emails" badge="8" />
                        <Button
                            type="button"
                            label="Messages"
                            icon="csi csi-users"
                            className="cs-button-warning"
                            badge="8"
                            badgeClassName="cs-badge-danger"
                        />

                        <h5>Button Set</h5>
                        <span className="cs-buttonset">
                            <Button label="Save" icon="csi csi-check" />
                            <Button label="Delete" icon="csi csi-trash" />
                            <Button label="Cancel" icon="csi csi-times" />
                        </span>

                        <h5>Sizes</h5>
                        <Button
                            label="Small"
                            icon="csi csi-check"
                            className="cs-button-sm"
                        />
                        <Button
                            label="Normal"
                            icon="csi csi-check"
                            className="cs-button"
                        />
                        <Button icon="csi csi-check" className="cs-button-lg" />
                        <br />
                        <Button icon="csi csi-check" className="cs-button-sm" />
                        <Button icon="csi csi-check" className="cs-button" />
                        <Button icon="csi csi-check" className="cs-button-lg" />

                        <h5>Template</h5>
                        <div className="template">
                            <Button className="google p-0" aria-label="Google">
                                <i className="csi csi-google px-2"></i>
                                <span className="px-3">Google</span>
                            </Button>
                            <Button
                                className="youtube p-0"
                                aria-label="Youtube"
                            >
                                <i className="csi csi-youtube px-2"></i>
                                <span className="px-3">Youtube</span>
                            </Button>
                            <Button className="vimeo p-0" aria-label="Vimeo">
                                <i className="csi csi-vimeo px-2"></i>
                                <span className="px-3">Vimeo</span>
                            </Button>
                            <Button
                                className="facebook p-0"
                                aria-label="Facebook"
                            >
                                <i className="csi csi-facebook px-2"></i>
                                <span className="px-3">Facebook</span>
                            </Button>
                            <Button
                                className="twitter p-0"
                                aria-label="Twitter"
                            >
                                <i className="csi csi-twitter px-2"></i>
                                <span className="px-3">Twitter</span>
                            </Button>
                            <Button className="slack p-0" aria-label="Slack">
                                <i className="csi csi-slack px-2"></i>
                                <span className="px-3">Slack</span>
                            </Button>
                            <Button className="amazon p-0" aria-label="Amazon">
                                <i className="csi csi-amazon px-2"></i>
                                <span className="px-3">Amazon</span>
                            </Button>
                            <Button
                                className="discord p-0"
                                aria-label="Discord"
                            >
                                <i className="csi csi-discord px-2"></i>
                                <span className="px-3">Discord</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonsPage;
