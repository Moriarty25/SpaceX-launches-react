import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//useAppSelector(state => state.launchesApi.queries.);

export const useAppDispatch: () => AppDispatch = useDispatch;
