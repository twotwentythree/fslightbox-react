import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { StageSources } from "../../../../src/core/Stage/StageSources";

describe('StageSources', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const stageSources = new StageSources(fsLightboxInstance);
    fsLightboxInstance.totalSlides = 10;

    it('should detect that sources in stage when its middle slide', () => {
        fsLightboxInstance.slide = 5;
        expect(stageSources.isSourceInStage(0)).toBeFalsy();
        expect(stageSources.isSourceInStage(1)).toBeFalsy();
        expect(stageSources.isSourceInStage(2)).toBeFalsy();
        expect(stageSources.isSourceInStage(3)).toBeTruthy();
        expect(stageSources.isSourceInStage(4)).toBeTruthy();
        expect(stageSources.isSourceInStage(5)).toBeTruthy();
        expect(stageSources.isSourceInStage(6)).toBeFalsy();
        expect(stageSources.isSourceInStage(7)).toBeFalsy();
        expect(stageSources.isSourceInStage(8)).toBeFalsy();
        expect(stageSources.isSourceInStage(9)).toBeFalsy();
    });

    it('should detect that previous source is in stage when slide = 1', () => {
        fsLightboxInstance.slide = 1;
        expect(stageSources.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next source is in stage when slide = totalSlides', () => {
        fsLightboxInstance.slide = 10;
        expect(stageSources.isSourceInStage(0)).toBeTruthy();
    });


    describe('StageSourcesIndexes', () => {
        it('should return previous slide array index', () => {
            fsLightboxInstance.slide = 5;
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightboxInstance.slide - 2);
            fsLightboxInstance.slide = 1;
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightboxInstance.totalSlides - 1)
        });

        it('should return next slide array index', () => {
            expect(stageSources.getNextSlideIndex()).toEqual(fsLightboxInstance.slide);
            fsLightboxInstance.slide = fsLightboxInstance.totalSlides;
            expect(stageSources.getNextSlideIndex()).toEqual(0);
        });

        it('should return object width previous, current and next slide array index', () => {
            fsLightboxInstance.slide = 5;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightboxInstance.slide - 2,
                current: fsLightboxInstance.slide - 1,
                next: fsLightboxInstance.slide
            });

            fsLightboxInstance.slide = 1;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightboxInstance.totalSlides - 1,
                current: fsLightboxInstance.slide - 1,
                next: fsLightboxInstance.slide
            });

            fsLightboxInstance.slide = fsLightboxInstance.totalSlides;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightboxInstance.slide - 2,
                current: fsLightboxInstance.slide - 1,
                next: 0
            });
        });


        it('should return only 2 indexes from getAllStageIndexes due to only 2 slides', () => {
            fsLightboxInstance.totalSlides = 2;
            fsLightboxInstance.slide = 2;
            expect(stageSources.getAllStageIndexes()).toEqual({
                current: 1,
                next: 0
            });
        });

        it('should return only 1 index from getAllStageIndexes due to only 1 slide', () => {
            fsLightboxInstance.totalSlides = 1;
            fsLightboxInstance.slide = 1;
            expect(stageSources.getAllStageIndexes()).toEqual({
                current: 0,
            });
        });
    })
});