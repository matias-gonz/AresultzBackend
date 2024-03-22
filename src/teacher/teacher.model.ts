export enum Subject {
  algebra = 'algebra',
  differentialCalculus = 'differentialCalculus',
  integralCalculus = 'integralCalculus',
  analyticGeometry = 'analyticGeometry',
  euclideanGeometry = 'euclideanGeometry',
  probability = 'probability',
  trigonometry = 'trigonometry',
  other = 'other',
}

export type Teacher = {
  name: string;
  lastName: string;
  email: string;
  subjects: Subject[];
};
