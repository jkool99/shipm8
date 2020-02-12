import { createSlice } from '@reduxjs/toolkit';

import GoogleCloudApi from '../api/GoogleCloudApi';
import { startLoading, loadingFailed } from '../utils/LoadingUtils';

const GoogleCloud = createSlice({
  name: 'GoogleCloud',
  initialState: {
    isLoading: false,
    error: null,
    zones: null,
    projects: null,
    clusters: null,
  },
  reducers: {
    fetchProjectsStart: startLoading,
    fetchProjectsFailed: loadingFailed,
    fetchProjectsSuccess(state, action) {
      const projects = action.payload;
      state.projects = projects;
    },
    fetchZonesStart: startLoading,
    fetchZonesFailed: loadingFailed,
    fetchZonesSuccess(state, action) {
      const zones = action.payload;
      state.zones = zones;
    },
    fetchGkeClustersStart: startLoading,
    fetchGkeClustersFailed: loadingFailed,
    fetchGkeClustersSuccess(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
    }
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsFailed,
  fetchProjectsSuccess,
  fetchZonesStart,
  fetchZonesFailed,
  fetchZonesSuccess,
  fetchGkeClustersStart,
  fetchGkeClustersFailed,
  fetchGkeClustersSuccess,
} = GoogleCloud.actions;

export default GoogleCloud.reducer;

// Thunks
const fetchGkeClusters = (projectId, zone) =>
  async dispatch => {
    try {
      dispatch(fetchGkeClustersStart());
      const clusters = await GoogleCloudApi.fetchClusters(projectId, zone);
      dispatch(fetchGkeClustersSuccess(clusters));
    } catch (err) {
      dispatch(fetchGkeClustersFailed(err.toString()));
    }
  }