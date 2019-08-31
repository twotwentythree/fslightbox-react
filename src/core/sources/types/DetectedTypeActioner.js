import React from 'react';
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image.jsx";
import Video from "../../../components/sources/proper-sources/Video.jsx";
import Youtube from "../../../components/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../components/sources/proper-sources/Invalid.jsx";
import { SourceLoadHandler } from "../SourceLoadHandler";

export function DetectedTypeActioner(fsLightbox) {
    const {
        collections: { sourcesLoadsHandlers },
        getState: getLightboxState,
        componentsStates: { isSourceLoadedCollection: sourcesHoldersUpdatersStateCollection },
        elements: { sourcesComponents },
        injector: { resolve }
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        let BaseSourceComponent;

        if (type !== INVALID_TYPE) {
            sourcesLoadsHandlers[i] = resolve(SourceLoadHandler, [i]);
        }

        switch (type) {
            case IMAGE_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[i].setUpLoadForImage();
                BaseSourceComponent = Image;
                break;
            case VIDEO_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[i].setUpLoadForVideo();
                BaseSourceComponent = Video;
                break;
            case YOUTUBE_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[i].setUpLoadForYoutube();
                BaseSourceComponent = Youtube;
                break;
            default:
                BaseSourceComponent = Invalid;
                break;
        }

        sourcesComponents[i] = <BaseSourceComponent
            fsLightbox={ fsLightbox }
            i={ i }
        />;

        if (getLightboxState().isOpen) {
            sourcesHoldersUpdatersStateCollection[i].set(true);
        }
    };
}