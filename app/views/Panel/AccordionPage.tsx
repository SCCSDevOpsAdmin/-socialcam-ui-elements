import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'src/elements';
import { Button } from 'src/elements';

export const AccordionPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onClick = (itemIndex) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        } else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            } else {
                _activeIndex.splice(index, 1);
            }
        }

        setActiveIndex(_activeIndex);
    };

    return (
        <div className="accordion-demo">
            <div className="card">
                <h5>Default</h5>
                <Accordion activeIndex={0}>
                    <AccordionTab header="Header I">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adicsiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cucsidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header II">
                        <p>
                            Sed ut perscsiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adicsisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header III">
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cucsiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                </Accordion>

                <h5>Multiple</h5>
                <Accordion multiple activeIndex={[0]}>
                    <AccordionTab header="Header I">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adicsiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cucsidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header II">
                        <p>
                            Sed ut perscsiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adicsisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header III">
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cucsiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header IV" disabled></AccordionTab>
                </Accordion>

                <h5>Programmatic</h5>
                <div className="pt-2 pb-4">
                    <Button
                        icon={
                            activeIndex &&
                            activeIndex.some((index) => index === 0)
                                ? 'csi csi-minus'
                                : 'csi csi-plus'
                        }
                        label="Toggle 1st"
                        onClick={() => onClick(0)}
                        className="p-button-text"
                    />
                    <Button
                        icon={
                            activeIndex &&
                            activeIndex.some((index) => index === 1)
                                ? 'csi csi-minus'
                                : 'csi csi-plus'
                        }
                        label="Toggle 2nd"
                        onClick={() => onClick(1)}
                        className="p-button-text ml-2"
                    />
                    <Button
                        icon={
                            activeIndex &&
                            activeIndex.some((index) => index === 2)
                                ? 'csi csi-minus'
                                : 'csi csi-plus'
                        }
                        label="Toggle 3rd"
                        onClick={() => onClick(2)}
                        className="p-button-text ml-2"
                    />
                </div>

                <Accordion
                    multiple
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <AccordionTab header="Header I">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adicsiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cucsidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header II">
                        <p>
                            Sed ut perscsiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adicsisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header III">
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cucsiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                </Accordion>

                <h5>Custom Headers</h5>
                <Accordion className="accordion-custom" activeIndex={0}>
                    <AccordionTab
                        header={
                            <React.Fragment>
                                <i className="csi csi-calendar"></i>
                                <span>Header I</span>
                            </React.Fragment>
                        }
                    >
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adicsiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cucsidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab
                        header={
                            <React.Fragment>
                                <i className="csi csi-user"></i>
                                <span>Header II</span>
                            </React.Fragment>
                        }
                    >
                        <p>
                            Sed ut perscsiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adicsisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab
                        header={
                            <React.Fragment>
                                <i className="csi csi-search"></i>
                                <span>Header III</span>
                                <i className="csi csi-cog"></i>
                            </React.Fragment>
                        }
                    >
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cucsiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    );
};
