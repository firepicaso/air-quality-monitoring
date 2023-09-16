import { setStates } from "../redux/states/statesSlice";

test('testing set states', () => {
    const statesData = [{ state: 'Quebec' }];
    const expectedAction = {
      type: 'states/setStates',
      payload: statesData,
    };
    expect(setStates(statesData)).toEqual(expectedAction);
});