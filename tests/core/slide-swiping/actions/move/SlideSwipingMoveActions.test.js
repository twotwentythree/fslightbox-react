import { SlideSwipingMoveActions } from "../../../../../src/core/slide-swiping/actions/move/SlideSwipingMoveActions";

const fsLightbox = {
    componentsStates: {
        hasMovedWhileSwiping: {
            get: () => {},
            set: () => {}
        }
    },
    core: {
        sourceHoldersTransformer: {
            transformStageSourceHoldersByValue: () => {}
        }
    }
};
let mockEvent;
// initial set of swiping props will be edited in tests
let mockSwipingProps = {
    downClientX: null,
    swipedDifference: null,
};
let slideSwipingMoveActions;

beforeEach(() => {
    // because we are using destructuring in SlideSwipingMoveActions we need to
    // instantiate it every test with new jest.fn()
    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHoldersByValue = jest.fn();
    slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, mockSwipingProps)
});


describe('setting hasMovedWhileSwipingState to true if not already set', () => {
    beforeEach(() => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();
        slideSwipingMoveActions.setMoveEvent({});
    });

    describe('not setting (already set)', () => {
        beforeEach(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => true;
            slideSwipingMoveActions.runActions();
        });

        it('should not call set', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).not.toBeCalled();
        });
    });

    describe('setting (not yet set)', () => {
        beforeEach(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => false;
            slideSwipingMoveActions.runActions();
        });

        it('should call set with true', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(true);
        });
    });
});

describe('event is mousedown', () => {
    beforeEach(() => {
        mockEvent = {
            clientX: 500,
        };
        mockSwipingProps.downClientX = 256;
        slideSwipingMoveActions.setMoveEvent(mockEvent);
        slideSwipingMoveActions.runActions();
    });

    it('should set swiped difference to clientX and downClientX difference', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(mockEvent.clientX - mockSwipingProps.downClientX);
    });

    it('should call transformStageSourceHoldersByValue with swiped difference at param', () => {
        expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHoldersByValue)
            .toBeCalledWith(mockEvent.clientX - mockSwipingProps.downClientX);
    });
});

describe('event is touchstart', () => {
    beforeEach(() => {
        mockEvent = {
            touches: [{
                clientX: 240
            }],
        };
        mockSwipingProps.downClientX = 768;
        slideSwipingMoveActions.setMoveEvent(mockEvent);
        slideSwipingMoveActions.runActions();
    });

    it('should set swiped difference to clientX and downClientX difference', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });

    it('should call transformStageSourceHoldersByValue with swiped difference at param', () => {
        expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHoldersByValue)
            .toBeCalledWith(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });
});