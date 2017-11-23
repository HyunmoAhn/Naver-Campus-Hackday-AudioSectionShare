import { createSelector } from 'reselect';

export const audioSelector = state => state.get('audio');

export const audioInfoSelector = createSelector(
	audioSelector,
	audio => audio.get('audioInfo'),
);

export const isFetchSelector = createSelector(
	audioSelector,
	audio => audio.get('isFetch'),
);

export const shareContentSelector = createSelector(
	audioSelector,
	audio => audio.get('shareContent'),
);

export const titleSelector = createSelector(
	audioSelector,
	audio => audio.get('title'),
);

export const urlSelector = createSelector(
	audioSelector,
	audio => audio.get('url'),
);

