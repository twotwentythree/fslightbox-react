import { SourceFactory } from "../../../../src/core/Source/SourceFactory";
import React from 'react';
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/CoreConstants";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";


describe('SourceFactory', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    fsLightbox.sourcesTypes = [
        IMAGE_TYPE,
        VIDEO_TYPE,
        YOUTUBE_TYPE,
        INVALID_TYPE
    ];

    describe('Calling correct methods depending on Source Type', () => {
        /**
         * @type SourceFactory
         */
        let sourceFactory;
        beforeEach(() => {
            sourceFactory = new SourceFactory(fsLightbox);
        });

        it('should call create img', () => {
            sourceFactory.createImageSource = jest.fn();
            sourceFactory.createSourceForIndex(0);
            expect(sourceFactory.createImageSource).toHaveBeenCalled();
        });

        it('should call create video', () => {
            sourceFactory.createVideoSource = jest.fn();
            sourceFactory.createSourceForIndex(1);
            expect(sourceFactory.createVideoSource).toHaveBeenCalled();
        });

        it('should call create youtube iframe', () => {
            sourceFactory.createYoutubeSource = jest.fn();
            sourceFactory.createSourceForIndex(2);
            expect(sourceFactory.createYoutubeSource).toHaveBeenCalled();
        });

        it('should call create info about invalid source', () => {
            sourceFactory.createInvalidSource = jest.fn();
            sourceFactory.createSourceForIndex(3);
            expect(sourceFactory.createInvalidSource).toHaveBeenCalled();
        });
    });
});