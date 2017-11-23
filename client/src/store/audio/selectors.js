import { createSelector } from 'reselect';

export const audioSelector = state => state.get('audio');

export const isFetchSelector = createSelector(
	audioSelector,
	audio => audio.get('isFetch'),
);