import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../src/FsLightbox";
import { fsLightbox } from "./__tests-services__/testLightbox";
import { ANIMATION_TIME } from "../src/constants/css-constants";
import { act } from "react-dom/test-utils";
import { testSources } from "./__tests-services__/testVars";

describe('should render each type of source without error', () => {
    beforeAll(() => {
        // loading all sources
        act(() => {
            for (let i = 0; i < fsLightbox.data.sources.length; i++) {
                fsLightbox.componentsServices.updateSourceInnerCollection[i]();
            }
        });
    })

    test('should render 3 stage sources after open', () => {
        expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
        expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
        expect(fsLightbox.elements.sources[2].current).toBeNull();
        expect(fsLightbox.elements.sources[3].current).toBeNull();
        expect(fsLightbox.elements.sources[4].current).toBeNull();
    })

    test('should render next sources after jumping to second slide', () => {
        act(() => fsLightbox.core.slideIndexChanger.jumpTo(2));
        expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
        expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
        expect(fsLightbox.elements.sources[2].current.tagName).toBe('IFRAME');
        expect(fsLightbox.elements.sources[3].current.tagName).toBe('H1');
        expect(fsLightbox.elements.sources[4].current).toBeNull();
    });

    test('should render specific stage sources after opening lightbox on specific slide', () => {
        jest.useFakeTimers();
        act(fsLightbox.core.lightboxCloser.closeLightbox);
        jest.runAllTimers();
        fsLightbox.stageIndexes.current = 1;
        act(fsLightbox.core.lightboxOpener.openLightbox);
        expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
        expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
        expect(fsLightbox.elements.sources[2].current.tagName).toBe('IFRAME');
        expect(fsLightbox.elements.sources[3].current).toBeNull();
        expect(fsLightbox.elements.sources[4].current).toBeNull();
    });
});

it('should not throw error when detecting type manually on each type of source', () => {
    const fsLightboxWrapper = mount(<FsLightbox
        toggler={false}
        openOnMount={true}
        disableLocalStorage={true}
        sources={testSources}
    />);
    jest.useFakeTimers();
    fsLightboxWrapper.find({ title: 'Close' }).at(0).simulate('click');
    jest.runTimersToTime(ANIMATION_TIME - 30);
    fsLightboxWrapper.update();
    expect(fsLightboxWrapper.children().getElements()).toEqual([]);
});
