//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['resources-cf.naranggo.com']
  },
  async rewrites() {
    return [
      {
        source: '/story/api/upload',
        destination: `https://intra-dev.ndream.com/Post/CKUpload`
      },
      {
        source: '/userlogin',
        destination: `https://api-dev.naranggo.com:4430/userlogin`
      }
    ];
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  }
};

module.exports = withNx(nextConfig);

/** @type {import('next').NextConfig} */
