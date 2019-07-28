import React from 'react';
import { SourceHolderTransformer } from "../transforms/SourceHolderTransformer";
import { getSourcesHoldersTransformersCollection } from "./getSourcesHoldersTransformersCollection";

const fsLightbox = {
    elements: {
        sourcesHolders: []
    },
    injector: {
        resolve: (constructorDependency) => {
            if (constructorDependency === SourceHolderTransformer) {
                resolveCalls++;
                return sourcesHoldersTransformingFacades[resolveCalls - 1];
            }
        }

    }
};

let resolveCalls = 0;
const sourcesHoldersTransformingFacades = [];

for (let i = 0; i < 15; i++) {
    sourcesHoldersTransformingFacades[i] = {
        setSourceHolder: jest.fn()
    };
}

const sourcesHolders = fsLightbox.elements.sourcesHolders;

for (let i = 0; i < 15; i++) {
    sourcesHolders[i] = React.createRef();
}

const retrievedCollection = getSourcesHoldersTransformersCollection(fsLightbox);

it('should call setSourceHolder with correct param on each SourceHolderTransformer', () => {
    for (let i = 0; i < 15; i++) {
        expect(sourcesHoldersTransformingFacades[i].setSourceHolder).toBeCalledWith(sourcesHolders[i]);
    }
});

it('should return array containing SourceHolderTransformer intances', () => {
    const expectedArray = [];
    for (let i = 0; i < 15; i++) {
        expectedArray.push(sourcesHoldersTransformingFacades[i]);
    }
    expect(retrievedCollection).toEqual(expectedArray);
});