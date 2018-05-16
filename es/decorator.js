/**
 * Created by hai.xiong on 2018/5/16.
 */

import React, { PureComponent } from 'react';
import ScrollShow from './ScrollShow';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default (options = {}) => function scrollShow(WrappedComponent) {
    return class ScrollShowDecorated extends PureComponent {
        constructor() {
            super();
            this.displayName = `ScrollShow${getDisplayName(WrappedComponent)}`;
        }

        render() {
            return (
                <ScrollShow {...options}>
                    <WrappedComponent {...this.props} />
                </ScrollShow>
            );
        }
    };
};