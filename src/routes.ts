import { youtubeVideoToBilingualText } from './youtube-video-to-bilingual-text';
import { body } from 'express-validator';
import { eligibleLanguages } from './eligible-languages';

const languageValidation = [
  body('language')
    .notEmpty()
    .withMessage('Language is required')
    .isIn(eligibleLanguages),
];

const youtubeVideoToBilingualTextValidation = [
  ...languageValidation,
  body('subtitleUrl').notEmpty().isString(),
  body('title').notEmpty().isString(),
  body('hasVideo').notEmpty().isBoolean(),
  body('timeRange.start').notEmpty().isString(),
  body('timeRange.finish').notEmpty().isString(),
  body('interval').notEmpty().isNumeric(),
];

const bilingualContentRoutes = (app) => {
  app.post(
    '/get-subtitles',
    youtubeVideoToBilingualTextValidation,
    youtubeVideoToBilingualText,
  );
};

export { bilingualContentRoutes };
