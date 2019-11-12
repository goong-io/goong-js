// @flow strict

type Config = {|
  API_URL: string,
  EVENTS_URL: ?string,
  FEEDBACK_URL: string,
  REQUIRE_ACCESS_TOKEN: boolean,
  ACCESS_TOKEN: ?string,
  MAX_PARALLEL_IMAGE_REQUESTS: number
|};

const config: Config = {
    API_URL: 'https://api-ss1.goong.io',
    get EVENTS_URL() {
            return 'https://goong.io';
    },
    FEEDBACK_URL: 'https://goong.io/contact',
    REQUIRE_ACCESS_TOKEN: true,
    ACCESS_TOKEN: null,
    MAX_PARALLEL_IMAGE_REQUESTS: 16
};

export default config;
