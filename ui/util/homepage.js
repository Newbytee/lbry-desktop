// @flow
import React from 'react';
import * as PAGES from 'constants/pages';
import * as CS from 'constants/claim_search';
import * as ICONS from 'constants/icons';
import { parseURI } from 'lbry-redux';
import moment from 'moment';
import { toCapitalCase } from 'util/string';

export type RowDataItem = {
  label: any,
  navigate?: string,
  help?: any,
  options?: {
    channelIds?: Array<string>,
  },
  hideRepostLabel?: boolean,
  route?: string,
  icon?: string,
};

const PRIMARY_CONTENT_CHANNEL_IDS = [
  '3fec094c5937e9eb4e8f5e71e4ca430e8a993d03',
  '5097b175c4c58c431424ce3b60901de6ae650127',
  '1d729d8a4bbed9f3e9bec0cf1e958980569b0681',
  '6184648aab0431c4c95c649072d1f9ff08b9bb7c',
  'b5d31cde873073718c033076656a27471e392afc',
  '7317cdf6f62be93b22295062e191f6ba59a5db26',
  '1cdb5d0bdcb484907d0a2fea4efdfe0153838642',
  'b516294f541a18ce00b71a60b2c82ad2f87ff78d',
  '91e42cc450075f2c4c245bac7617bf903f16b4ce',
  'b6e207c5f8c58e7c8362cd05a1501bf2f5b694f2',
  '25f384bd95e218f6ac37fcaca99ed40f36760d8c',
  'f33657a2fcbab2dc3ce555d5d6728f8758af7bc7',
  '5499c784a960d96497151f5e0e8434b84ea5da24',
  '9614a4fcf9d91e4588eb512165e9c0475f857555',
  '294f5c164da5ac9735658b2d58d8fee6745dfc45',
  '119a2e8c0b50f78d3861636d37c3b44ba8e689b5',
  '7b23cca3f49059f005e812be03931c81272eaac4',
  'fb0efeaa3788d1292bb49a94d77622503fe08129',
  '797a528c49b6535560f7fd8222b121b0223287c8',
  'bc490776f367b8afccf0ea7349d657431ba1ded6',
  '48c7ea8bc2c4adba09bf21a29689e3b8c2967522',
  'bf7490f905904e79de5c90e472bb9e6f26e634a0',
  'df961194a798cc76306b9290701130c592530fb6',
  'cf0be9078d76951e2e228df68b5b0bbf71313aaa',
  'd746ac8d782f94d12d176c7a591f5bf8365bef3d',
  '5640bb7d84d8953d367841909967ab345f2c11ca',
  '9b8a09c41c834f0d629cea4a083f86e4645feb0d',
  '21aab81cf6b7f3eac2a5d934d35328560ba6fc9f',
  '1f30267438257020f08abf452746a48e53a71ad5',
  '4ad942982e43326c7700b1b6443049b3cfd82161',
  '1cdb5d0bdcb484907d0a2fea4efdfe0153838642',
  '6616707e1109aaa1c11b9f399f914d0cfb4f5303',
  '4ee7cfaf1fc50a6df858ed0b99c278d633bccca9',
  'b7d02b4a0036114732c072269adb891dc5e34ca4',
  '9c51c1a119137cd17ed5ae09daa80c1cab6ac01d',
  '5f2a5c14b971a6f5eed0a67dc7af3a3fe5c0b6a4',
  '0e2b5b4cf59e859860000ff123dc12a317ad416b',
  '3fe68ad3da93065e35c37b14fbeef88b4b7785ed',
  'fd7ffcbafb74412a8812df4720feaf11fe70fe12',
  'b4c30fe36b79870a79c55e1e909adb5ad23f323f',
  '92c0f2f3239f1f61496997bd2cdc197ec51bd423',
  '29193e9240a71a735639c66ee954e68414f11236',
  '25f384bd95e218f6ac37fcaca99ed40f36760d8c',
  '87b13b074936b1f42a7c6758c7c2995f58c602e7',
  '8d935c6c30510e1dfc10f803a9646fa8aa128b07',
  '8f4fecfc836ea33798ee3e5cef56926fa54e2cf9',
  '9a5dfcb1a4b29c3a1598392d039744b9938b5a26',
  'c5724e280283cd985186af9a62494aae377daabd',
  'b39833be3032bbe1005f4f719f379a4621faeb13',
  '589276465a23c589801d874f484cc39f307d7ec7',
  'fb364ef587872515f545a5b4b3182b58073f230f',
  '6c0bf1fed2705d675da950a94e4af004ec975a06',
  'ab524c5a1902d7a0f072ebc4d093a0e500704202',
  'b924ac36b7499591f7929d9c4903de79b07b1cb9',
  '113515e893b8186595595e594ecc410bae50c026',
  '72f9815b087b6d346745e3de71a6ce5fe73a8677',
  'c9da929d12afe6066acc89eb044b552f0d63782a',
  '760da3ba3dd85830a843beaaed543a89b7a367e7',
  'b0198a465290f065378f3535666bee0653d6a9bb',
  '020ebeb40642bfb4bc3d9f6d28c098afc0a47481',
  '5c15e604c4207f52c8cf58fe21e63164c230e257',
  '273a2fa759f1a9f56b078633ea2f08fc2406002a',
  '930fc43ca7bae20d4706543e97175d1872b0671f',
  '0cb2ec46f06ba85520a1c1a56706acf35d5176dd',
  '057053dfb657aaa98553e2c544b06e1a2371557e',
  '64e091964a611a48424d254a3de2b952d0d6565a',
  '50ebba2b06908f93d7963b1c6826cc0fd6104477',
  '374ff82251a384601da73f30485c3ac8d7f4176b',
  '1487afc813124abbeb0629d2172be0f01ccec3bf',
  '6a4fa1a68b92336e64006a4310cb160b07854329',
  '15f986a262fc6eff5774050c94d174c0533d505d',
  '6184648aab0431c4c95c649072d1f9ff08b9bb7c',
  '1efa9b640ad980b2ec53834d60e9cff9554979cd',
  '70e56234217f30317c0e67fd0eede6e82b74aea0',
  '064d4999ea15e433e06f16f391922390acab01cb',
  '4884e30b93b3c4c123a83154516196095f9e831e',
  '2827bfc459c12d7c6d280cbacee750811291d4ba',
  '69b3c0cae5d30be16423b931c4552ed050a244b0',
  '9626816275585ac3443e7cddd1272c8652c23f1d',
  'a2e1bb1fed32c6a6290b679785dd31ca5c59cb5f',
  'd9535951222dd7a1ff7f763872cb0df44f7962bf',
  '243b6f18093ff97c861d0568c7d3379606201a4b',
  '1ce5ac7bab7f2e82af02305ced3c095e320b52e5',
  '3e63119a8503a6f666b0a736c8fdeb9e79d11eb4',
  'e33372c0d8b2cdd3e12252962ee1671d66143075',
  '7364ba2ac9090e468855ce9074bb50c306196f4c',
  'd6350f9158825662b99e4b5e0442bcc94d39bc11',
  '2a294ea41312c6da8de5ebd0f18dbfb2963bb1a4',
  '44c49bbab8a3e9999f3ba9dee0186288b1d960a7',
  '2305db36455aa0d18571015b9e9bd0950262aa0f',
  '82f1d8c257d3e76b711a5cecd1e49bd3fa6a9de9',
  'faed2b028a9b5a712d5180eaa6fd2aa619f941bc',
];

export const PRIMARY_CONTENT = {
  label: (
    <span className="no-evil">
      <span className="no-evil--blue">D</span>
      <span className="no-evil--red">o</span>
      <span className="no-evil--yellow">n</span>
      <span className="no-evil--blue">'</span>
      <span className="no-evil--green">t</span> <span className="no-evil--red">b</span>
      <span className="no-evil--blue">e</span> <span className="no-evil--red">e</span>
      <span className="no-evil--yellow">v</span>
      <span className="no-evil--blue">i</span>
      <span className="no-evil--green">l</span>
    </span>
  ),
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${PRIMARY_CONTENT_CHANNEL_IDS.join(',')}`,
  options: {
    claimType: ['stream'],
    orderBy: ['release_time'],
    pageSize: 8,
    channelIds: PRIMARY_CONTENT_CHANNEL_IDS,
    releaseTime: `>${Math.floor(
      moment()
        .subtract(1, 'months')
        .startOf('week')
        .unix()
    )}`,
  },
};

export const PRIMARY_CONTENT_2 = {
  label: __("Don't Be Evil"),
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${PRIMARY_CONTENT_CHANNEL_IDS.join(',')}`,
  options: {
    claimType: ['stream'],
    orderBy: ['release_time'],
    pageSize: 8,
    channelIds: PRIMARY_CONTENT_CHANNEL_IDS,
    releaseTime: `>${Math.floor(
      moment()
        .subtract(1, 'months')
        .startOf('week')
        .unix()
    )}`,
  },
};

const RABBIT_HOLE_CHANNEL_IDS = [
  'a5af5f42b57d31b982fd700f65b02ee589751b96',
  'ea86138fdfac9891a2e15cec9b2143ef64805435',
  'b541d03b30c3fea017280d8ae1758a9f2035f44f',
  '81c637fdba001ff4406123c1fd4f5a1c6e1772f7',
  '0c4a8b59b2e1bf396210be96f690d8d37251d39b',
  'a190ec65b6d67df868be2208c62510c257ace16e',
  'df75764e06247ccec50dbc87a9c4a8a95a32658d',
  'd70c3d47eff085d56e6328fc2f2def163b1d21fb',
  '02f3c6b00fcaa365c5858352ca1ee149aea7b90f',
  '6259aac793195c93a4dce1940e2581c238fd2021',
  '526b15b49e5ff7d1fd9443b7f9b30ad1194c3235',
  '70d122698cc6d3511036c7fb2e6dca5c358463de',
  'f14e64d962c226630702f9a61f48ab4f55ecffb9',
  'bc490776f367b8afccf0ea7349d657431ba1ded6',
  '935e7ed2c8b2a184ba2f39167f0201a74910235b',
  '3fec094c5937e9eb4e8f5e71e4ca430e8a993d03',
  '780abbacb30bffd0554a3d6e79764cdc3551a0a5',
  'e8db076af81d517098c81b30c71ce42cf05daeda',
  '4407261b86abf43b85448657d9d2a4f13a968d87',
  '191a3374da974a9528cd39497ffb31011988dfce',
  '40592b2f8bba7f702c62b8ab91402bd1a257ab18',
  '0e42d95f05f3543937390f1a573d6fd9840eaa46',
  '7a3c90e0e7d7214f6bbe2994a4a5fff6d4afd515',
  '8dc55cd4acb6e8d903a85e3bd9b15478bbdad3b5',
  'a8d874a26b64b7cf2584268ffcfe4c5e07aac6d4',
  'f6190681f20cbb905f5ff7d58e568603f81de8ba',
  '82f1d8c257d3e76b711a5cecd1e49bd3fa6a9de9',
  '302e6aeb7e8f31e17660bbbe5c94ad4e072ba904',
  '4651d91cc32c01243069af1f39468928102750dc',
  '5e0ee088f3b80915a24dc3b59adf164460141359',
  '28945e47d977bb49f8eb2ca4e98ef2ee243e1f2e',
  'e8b0d5e34558b8a852374fd40af1c0150a65504b',
  '9170327aa5ad2c6bea0b167f840032036eaf9064',
  'b4fea5d9a31024fd5b6609c188b55bfa883a8ae0',
  '3645cf2f5d0bdac0523f945be1c3ff60758f7845',
  '0f8078f7710ce929ac176e3df0e08cf0b6ab2125',
  'b325961c50c986f2022313220e5b98da9b0004bc',
  '6175f135650778103c72ae3bee8561b75f264586',
  '7f1137707c918dab287ac91c9dbb28748696a36b',
  'c101bac49ec048acca169fd6090e70f7488645b1',
  'a527400d6bf96de2bd1811e978f23790748b06e1',
  'eca0cce47d1111668f2ad040ed13fa4924d4c346',
  'e99c0ecc262375abfc2b9548d9bd0c0d11bb3a71',
  '5c15e604c4207f52c8cf58fe21e63164c230e257',
  '09d4223819ac29d5462a3eea2b1f35b5482770a2',
  'b0198a465290f065378f3535666bee0653d6a9bb',
  'f4c726ebb9e9e6308cae9970c5f1cf430b33ddc1',
  '9f58aaa07638c45e6d7be611b5e8714f7cdd09bf',
  'f2318083d4a21c9b1b619ed4d2f420c9766683f5',
  '0b3d9716a33b3958bc89fd23d550f17cab5bbf98',
  '13edd7e7e2fbaf845699cf2f8f0b1c095bacb05f',
  '5663072977d3a0f161780cfd6ddc7507f157ffcd',
  '207d310712f28c7e7c3436bb3d86f2481a8cfaf1',
  'b9288432bd089c6f332145aab08a56eec155f307',
  '9db218b153feebb1fcc847ee0e5e921c85fc8852',
  '56f784fd6682f2b75a64be95f9443eadf2ef4a66',
  '2379d6ca19ce29e64035682ed2b94cb6ec18bb83',
  '94fb122085a5f934292bee5547085e4961f847e1',
  'e39dd89fc7ace77e84aebc0b4c88182e21196ff4',
  'a4361b1435691b54b6e1abe2546080809c4029f9',
  'ea5810ca7e60b4e906b021eaf3c55c61d2aea6f6',
  'e7ac2c49710f5657760bcb34abf65802f8c8e13c',
  '51d000168749e39034f90c90be803f0536ab0243',
  '34ecf8b9cd2f49580a49a175589207625ad2ac8d',
  'd388ed630deef5adddd63767e7dd9b0a2fefdf4a',
  '2a3ef5da49872fa4c8cc4103c237e8f9fd7634e3',
  '4a966b4b5144027d9339922cfc6a03fc66c9f3fb',
  'e0941d15ea9fd1872c58f51b2d2109fc66b4c96e',
  'b04bd5e53b5d72e912d68e09d7f326f5c14fce28',
  '818c4e6b66467cea971c9a26d79723c58582af3e',
  'b7a15c35aa63c02b62f3fd8b02a3fe5ae7263ad6',
  '07bfd6eb2935e9be50bdec56d34d9227c511f8c6',
  'c7e6f045bbcf10f651d8948605a42758ebda18e7',
  'b89ed227c49e726fcccf913bdc9dec4c8fec99c2',
  'cde3b125543e3e930ac2647df957a836e3da3816',
  '88745fbeb9655201b1824ee1cda5c6e718bcb4fd',
  '84edf7e474aba8a285d42a2ac1792801c5a2ca40',
  '0d2ad3f6c9810bad6c3e7bb0d06caf3c8112a44f',
  '11ef4045587c753d4892f7f1e41317ae06cb8746',
  '68eb3f3e884400f60080bb910055bc11fecd26d2',
  'e11e2fc3056137948d2cc83fb5ca2ce9b57025ec',
  'cec54cfc1b67da757bcab8a8643328717bbd339d',
  'ee1aaf96d05ddf21e96deb681d5ed2f5dea1d237',
  '5cad54ea797c4ec339cc3437a12b144a97d63c08',
  '8efc01ef6c24793d0f2f0a415b201d22a427a1d9',
];

export const RABBIT_HOLE = {
  label: __('The Rabbit Hole'),
  route: '/$/rabbithole',
  icon: ICONS.RABBIT_HOLE,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${RABBIT_HOLE_CHANNEL_IDS.join(',')}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 8,
    channelIds: RABBIT_HOLE_CHANNEL_IDS,
  },
};

const ENLIGHTENMENT_CHANNEL_IDS = [
  '82f1d8c257d3e76b711a5cecd1e49bd3fa6a9de9',
  '3fec094c5937e9eb4e8f5e71e4ca430e8a993d03',
  '0871b29c7db6f1ec013694c8146f772539fcffa3',
  '537305bc1bd71e2a5d76efacd607fd0f4d95da0c',
  'bf7490f905904e79de5c90e472bb9e6f26e634a0',
  'c07ce3862335cfe9ba72054347c4ea7808ce4eaa',
  '0e1aff187fbd3d2b2b16e5e8c213d3e782dafa98',
  'a1303dc6a592605b08d60cac19ecbc1c877d7de7',
  '2a294ea41312c6da8de5ebd0f18dbfb2963bb1a4',
  'd6350f9158825662b99e4b5e0442bcc94d39bc11',
  '3e7bb536a1b755b6eb64043ae3fa933d5935eaad',
  '0518c93a80efeaf06fb4ac4d3fa72cc6390ac100',
  'b8a2d928a3d3f44457a10abd0539b84e4a29c286',
  '564789ffe2420980dcf9e00c4746feb5bc0daad0',
  '7364ba2ac9090e468855ce9074bb50c306196f4c',
  'e33372c0d8b2cdd3e12252962ee1671d66143075',
  '3e63119a8503a6f666b0a736c8fdeb9e79d11eb4',
  '1ce5ac7bab7f2e82af02305ced3c095e320b52e5',
  '588ff6ffc72884e61e8d19a9412d6db9ec67167e',
  'b51872361cc68c914eb7c6f2d22eace9570a9f4a',
  '51d34684ec97cc7057f2c371d8edbadb6b841707',
  '7d30976c407fa3cf82675f7d1e8ea99b5ab2959d',
  '64adb5d029acaff293b2934e870d3976760a1353',
  'd9c552d38238f00503741e8e468cd3da612b42c4',
  '0831bef6095a57ec440f626aac2a650a20282945',
  '81c637fdba001ff4406123c1fd4f5a1c6e1772f7',
  'ddc7f2030c474ca4c9c0043bf19ec0bf79e2783f',
  '2827bfc459c12d7c6d280cbacee750811291d4ba',
  '0b875d01f2578bde0cbb221eb6a67f23f2222823',
  '47e1d179bd2753e6e53f28f5e99fb090d336d2e8',
  '5c4370bfff3070458df198f6ba60c6eb1244c014',
  '6184648aab0431c4c95c649072d1f9ff08b9bb7c',
  '45e55a50627305311479123e0fec171e16a0cd0f',
  'c62490d59850450bc8acf26e227f56aee4e9bdf5',
  '07e4546674268fc0222b2ca22d31d0549dc217ee',
  '1487afc813124abbeb0629d2172be0f01ccec3bf',
  '8e9ef4a69ef17507d1a3649573999a61e97f262c',
  'f67929e214b9d2e6a317f96750093d00c757515a',
  'e918922b39e09492e0c54828ee58e0cd7165e950',
  '64e091964a611a48424d254a3de2b952d0d6565a',
  'ffc92d8fddf384075f871445d67090887497c587',
  '2b86a3d4ba852f2e7e99ba279cf99412ead428e0',
  '057053dfb657aaa98553e2c544b06e1a2371557e',
  '0cb2ec46f06ba85520a1c1a56706acf35d5176dd',
  'd421f5954690807d3e5749e9a9671d7b067ef9e5',
  '711da3ea1683900643021c58342b1608e9be0524',
  'a77b073817c8b25edcea146feb84c726efba8269',
  '526b15b49e5ff7d1fd9443b7f9b30ad1194c3235',
  '5c15e604c4207f52c8cf58fe21e63164c230e257',
  'b0198a465290f065378f3535666bee0653d6a9bb',
  '2eefe1b1cfdcf6c58a0fe37f71dffca36a41030a',
  '6c0bf1fed2705d675da950a94e4af004ec975a06',
  'c5724e280283cd985186af9a62494aae377daabd',
  '5b8c91cdf40b2b0c14a2ef1a4fbe987a34d4677c',
  'd25ae97a1516f5700fc717152b885f33da47f12b',
  '56f784fd6682f2b75a64be95f9443eadf2ef4a66',
  'f07a506ee0396b004a7b535f3207a69387fb5a86',
  '2c9485e000eac29349bc4538a91d5a45ec56b126',
  'b4c30fe36b79870a79c55e1e909adb5ad23f323f',
  'da5534547c15856646c1bd281313ddd55cbec407',
  '495a668d18b93c11079f1ce93195a330fe35e603',
  '2677aa4bb592d97c4be07b80124507db18a529f4',
  '74e380497449d9eb13de9bc4038676097e4730fe',
  '36e6a8937381df34825dfbc8a85f38c30de02eee',
  'ce59b0c52f73407a8bcf95c604803dd8c9c30986',
  '92fc977af0e937e9ed6b135a54ae01f978d9cb04',
  'e39dd89fc7ace77e84aebc0b4c88182e21196ff4',
  '6ab0d775b951fa2ba3770bb72e129663d963f08a',
  '2425da1f0245d08e53559b2f4243f82a2a459505',
  '7a8954b2c09cb835f4b90be69fd4a5fc4f1b5f04',
  '1cdb5d0bdcb484907d0a2fea4efdfe0153838642',
  '68846c9a38ffac12c9b59a2f989a6554a1fada3c',
  '0cd2ffa6045eafce28c1abcb518688bed8c79acf',
  'ae64f8ff59f5c226b61434eee805afea56b85a97',
  '5c3ae8555f9706bff568d28549b8d66ed05fd490',
  '0ec0442f7faf0b3aa18fcef68dccadc04c3e7bd6',
  'd388ed630deef5adddd63767e7dd9b0a2fefdf4a',
  '76a00fbe5bec7fe7f7649d4c74c6ede151f083ee',
  '4a966b4b5144027d9339922cfc6a03fc66c9f3fb',
  '120d6665e352eb1733396a59bd3ffea87268033a',
  '5190f00b950ae96607a5f1f1585b06dc1d869ef4',
  '1f30267438257020f08abf452746a48e53a71ad5',
  '5640bb7d84d8953d367841909967ab345f2c11ca',
  'ddc7f2030c474ca4c9c0043bf19ec0bf79e2783f',
  'f14e64d962c226630702f9a61f48ab4f55ecffb9',
  'cec54cfc1b67da757bcab8a8643328717bbd339d',
  '46be492ee0f56db11e005991c537c867a8682f77',
  'a403ce7eff82b75a530dffd211ddc69847be4425',
  
];

export const ENLIGHTENMENT = {
  label: __('Enlightenment'),
  route: '/$/enlightenment',
  icon: ICONS.ENLIGHTENMENT,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${ENLIGHTENMENT_CHANNEL_IDS.join(',')}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 12,
    channelIds: ENLIGHTENMENT_CHANNEL_IDS,
  },
};

const GAMING_CHANNEL_IDS = [
  'b7d204c8ac9b0b5df4ffc4350afa432bf579543e',
  '02c020b2fab7dd1fbd175c3b22947688c0a219e5',
  'e8c71ade66ffb2cd7be3fa08f1d0a19ac70bfc65',
  '15c88c561f7e4c4cdd6fb4e32c35e593db09a8a4',
  '1d729d8a4bbed9f3e9bec0cf1e958980569b0681',
  '514df20b9d2cce22725d5305a8ba019547188736',
  '199eba05b6ecccab919e26a0cb7dacd544f25700',
  'ff9dddaef1f0c7938d7a4a170abef24c70e4cec7',
  '164845c52a9407f3406494f87523f2956c2b7936',
  '3a3af9d672ad2166737758f4e35ac6fd6f1235f9',
  'ee09d6c4ac3fbfc99635875d18f2aa98037d2602',
  'd746ac8d782f94d12d176c7a591f5bf8365bef3d',
  '520de75a0373643c14168536940e596ff8ece24c',
  'e715c457b4a3e51214b62f49f05303bba4ee5be9',
  '1d31472f4ed71162268afb92a5bf9d60b130317d',
  '9218bf25ba0d146a320ef3be7ebb85069cbe3353',
  'de503eb9fe4e68aa556abf94649dcd87ef42c985',
  '9071c16e86e86cb94e5364b580522b3aca55cb4d',
  '8d0770159e22943c37962b4d203fb85bf3057b3f',
  '9456c69274d4d608971d4d92f6218185d0831b11',
  'a91d3667c0c1f5344d6b41115506c888ca0b90c9',
  '9ccea33130f6e22bf0dec9448e0ecbbfa987ee42',
  'db35d0216ac55ef46420b5228263bb04655599a4',
  '36a291fa2c43bc42b8b589d3fb7e7a121868870d',
  '20b4b5ac6ddf68767e0da6765bcb0b389425d252',
  'd700ab31f4027a274b87288930c7a7d7fe0eae95',
  '489b75de1aeb6fe94e3dd930a231b7587b66d08f',
  '046f085572c0cd72127a3ae7e26b1f9881247840',
  '90f94b559aa94d5354326a6c0516c8f681930b57',
  '8f7cebbc8213cbf0a4cc5b80da080c1b42375983',
  'fce4a5526d6d541d9f971e5cd15d98376b6ff607',
  'd6350f9158825662b99e4b5e0442bcc94d39bc11',
  'e233d2b45b8287acabf43702f6d9b94f2cee3658',
  '9626816275585ac3443e7cddd1272c8652c23f1d',
  '56dbd77df6e7034fad4699736ce200cd74c45a2f',
  '4884e30b93b3c4c123a83154516196095f9e831e',
  '1516361918bfd02ddd460489f438e153c918521c',
  'f0985ae3a3d69ba4ae8696120d38f4dd9cd39fc4',
  'a1c8f84670da9a3371bc5832e86c8d32826b2f2e',
  '143b738a1e054cc48c925fd3605b39bca3dd5971',
  '952dbc5e95b87538f3aac71306651f179bc2e90a',
  '7ea92a937f5755b40ac3d99ed37c53b40359b0a2',
  'e473f25d192d5cb180d3718ed8e0e8c4f5db8245',
  '05f157d8e8aa4b700b18e244f9813e0bf9fdf85a',
  '1487afc813124abbeb0629d2172be0f01ccec3bf',
  '0bfc37e2db0b10da237195561dd37dfe7ecdf923',
  '8e098d2042ad9b9074f52cc06b89d6d4db5231dd',
  '5c15e604c4207f52c8cf58fe21e63164c230e257',
  '020ebeb40642bfb4bc3d9f6d28c098afc0a47481',
  '510c312730b03cb91ab24e25ec2937cd4aaad767',
  'f6c6531bfadd0535894ae67be0eaa274d7ec7feb',
  '25f384bd95e218f6ac37fcaca99ed40f36760d8c',
  '70d0495ea46072bead82429fb405d60438036524',
  'fd7c4e2ef9f9ab457d9a15bf2fbbc6bebf0fe971',
  'aeb882df790ac1c25697954b2bf5cbb3a4ed06f9',
  '31b9c54042b6cc1d1a388af1463e40baa9b37e7c',
  '92c0f2f3239f1f61496997bd2cdc197ec51bd423',
  'c425ffbcc0c1ae0e0be7435f26f341f5ed4016c7',
  '4a48d3f5c2058c9172c1a267beac6dac0b664d29',
  '01e25f93b2e2b6d3ab6253619ee9ac66cc6568cc',
  '079b201da1b30115767f4eb1393ca397f94ac947',
  'e84d35cb7f1b7ec84207edcd53c6ff16340147fa',
  '1b982d94d3c62813053c998c0af83a3b1c9c4db2',
  'ce59b0c52f73407a8bcf95c604803dd8c9c30986',
  '93a1b6e71cbd6b650254db1bbd9700d66716090e',
  '935aba04a2468e2c09e10c64c6deabdd107892d1',
  '9c51c1a119137cd17ed5ae09daa80c1cab6ac01d',
  '71dcbdcfcbb548b5b8a54ce04f6290abea07b491',
  'c18996ca488753f714d36d4654715927c1d7f9c2',
  '376a17e734d827276b8dd3fdc44077aa000b0f5a',
  'ec7c11ddc00bb8c3ddba97805811cd408261778f',
  '21cc6c7696e56d550664548768e84f0f1e40615d',
  '32e8ffd44b23769472abe62635005bf13538a167',
  'cfde892411994074f8c3b3127c5c493924909434',
  '820321da50156ec53ea9afbb59bdc298262c1d0a',
];

export const GAMING = {
  label: __('Gaming'),
  route: '/$/gaming',
  icon: ICONS.GAMING,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${CS.CHANNEL_IDS_KEY}=${GAMING_CHANNEL_IDS.join(
    ','
  )}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 12,
    channelIds: GAMING_CHANNEL_IDS,
  },
};

const COMMUNITY_CHANNEL_IDS = [
  'b36f5f628e63c2c8a0d063c2be08c1f004984d68',
  '90b566f5aca9c9a3b23b56cf6d75c07493737bc9',
  '1aa69a21a8d7e7bab3f9366aba52936e3ddc5330',
  '1cdb5d0bdcb484907d0a2fea4efdfe0153838642',
  '55f552c153a6922798ce9f6d429b69c87c4c992a',
  'b516294f541a18ce00b71a60b2c82ad2f87ff78d',
  'ca43e7e24420ff5276694b8251643efd97271be1',
  '297abfc0e8d63be217952ef20206a447de677d84',
  '89985db232ec2a9a31dbd985196de817da223fe6',
  '187bf3616318b4bfb85223fc40724c307696f0c6',
  'c7d2d5150a331e1696d95abb9a7b59d837c4e5a1',
  'f33657a2fcbab2dc3ce555d5d6728f8758af7bc7',
  '5097b175c4c58c431424ce3b60901de6ae650127',
  '49f1876b382a69414a330995908e326c7b96c132',
  '1d729d8a4bbed9f3e9bec0cf1e958980569b0681',
  '294f5c164da5ac9735658b2d58d8fee6745dfc45',
  'e8b0d5e34558b8a852374fd40af1c0150a65504b',
  'c2b6c8f86dedbae881117718f5d37250f6da2564',
  'ebdee96e9a17c9e5fe7627cc644eb75bd068a6ec',
  'e50f82e2236274c54af762a9c2b897646477ef62',
  '797a528c49b6535560f7fd8222b121b0223287c8',
  '935e7ed2c8b2a184ba2f39167f0201a74910235b',
  'e80e3070d5c82d934f09d439fb9ca9eca5e155b8',
  '3fec094c5937e9eb4e8f5e71e4ca430e8a993d03',
  '7317777e3751efa66218f6da5ef0d01dda69af48',
  'a757e39ff8abb2e2f13e88c9b7ad0105ea459ed9',
  'a2e1bb1fed32c6a6290b679785dd31ca5c59cb5f',
  'c64f446ba359272f36c5b4abe02109d0a25bbbef',
  '26b498d808f8ed9955caaf7e27cef31b20b2c87a',
  '58b9503ee85cf5bb5268b4fd75644ea17b6c0d5d',
  'df961194a798cc76306b9290701130c592530fb6',
  'd34376986bc857846993ff0aa750875bf7cf1b4a',
  '0831bef6095a57ec440f626aac2a650a20282945',
  '7109221d4047efb7e94b1d55c781757702a66f32',
  'f456460846ee417b9d8d333a5d71a5bd7867cc61',
  'ea1888b5758a23ff3c62b9a3fe07badb3e403cde',
  '3fe68ad3da93065e35c37b14fbeef88b4b7785ed',
  '4fa230f864cc4cd9c7d9962c042c49f35e913ffe',
  '74e380497449d9eb13de9bc4038676097e4730fe',
  'c113df372c5bf801e6afebb700ce01347b211911',
  'e328468c130c232dcd282538b187e03dcfdbc13f',
  'e228ccf0ee188ef41372a8d7abdf9ce1c3408442',
  'c3f55aa9cb1d57828a468c7a6d02df42627a9524',
  '08f31fe3fa6caa14799d7a7d1de8713553f5e8ee',
  '5f2a5c14b971a6f5eed0a67dc7af3a3fe5c0b6a4',
  '7d332c8adf25a2179e031be9c20bc346d20aee1d',
  '4ee7cfaf1fc50a6df858ed0b99c278d633bccca9',
  '5dfe76321bde01412ccad93a5a4ff48240c56bd6',
  '32b91e45b29ca8d3af9ca9f9580601c53bd88974',
  '51d000168749e39034f90c90be803f0536ab0243',
  'b22b497df412cd904c3be94e237a1f4693250ba8',
  '5db02b3127911ac154fe951871c81c20d3902498',
  'f9711aef0efe74352c4315a2e2f9aba74d5c0ff5',
  '07bfd6eb2935e9be50bdec56d34d9227c511f8c6',
  '4ad942982e43326c7700b1b6443049b3cfd82161',
  '21aab81cf6b7f3eac2a5d934d35328560ba6fc9f',
  '9b8a09c41c834f0d629cea4a083f86e4645feb0d',
  '9614a4fcf9d91e4588eb512165e9c0475f857555',
  'a757e39ff8abb2e2f13e88c9b7ad0105ea459ed9',
  'c64f446ba359272f36c5b4abe02109d0a25bbbef',
  '69b3c0cae5d30be16423b931c4552ed050a244b0',
  '2556ed1cab9d17f2a9392030a9ad7f5d138f11bd',
  '50d9c04b064b52249ceed889c55fff8db3dedb78',
  '70e56234217f30317c0e67fd0eede6e82b74aea0',
  'a1c8f84670da9a3371bc5832e86c8d32826b2f2e',
  '5c4370bfff3070458df198f6ba60c6eb1244c014',
  '96ede5667bc4533ace8cfcbde4f33aa9fe1ae5f5',
  '5097b175c4c58c431424ce3b60901de6ae650127',
  'b032695b52a78e0f5251b8d7f2f32183a5985d19',
  'a6a3b8eb73f184949add50257e1d1ad2fe2d8425',
  '15f986a262fc6eff5774050c94d174c0533d505d',
  '8e9ef4a69ef17507d1a3649573999a61e97f262c',
  'f67929e214b9d2e6a317f96750093d00c757515a',
  '2beb4ed8985dcc5b11334722abb024af1556415e',
  'b12e255e9f84d8b4ed86343b27676dccbc8b6d8b',
  '50ebba2b06908f93d7963b1c6826cc0fd6104477',
  '3c8b9829b664279c1ee285cb383c6d753a60c6c3',
  'e5335287649b30009ed07f65cfc99f777af57784',
  '06980eeb4d2d1bc26ba2763177f1a71124d7dd78',
  'fd1aee1d4858ec2ef6ccc3e60504c76e9d774386',
  'f32f020e2885d763627a0c71dae86c7c33e1f693',
  '58326307ddf6e9da5c4c09684f3885aad594a1c1',
  'be757c3bff18e553b9692930a7c1c85962cd69d9',
  '273a2fa759f1a9f56b078633ea2f08fc2406002a',
  '760da3ba3dd85830a843beaaed543a89b7a367e7',
  //   'c9da929d12afe6066acc89eb044b552f0d63782a',
  //   'ab524c5a1902d7a0f072ebc4d093a0e500704202',
  //   'c5724e280283cd985186af9a62494aae377daabd',
  //   '9a5dfcb1a4b29c3a1598392d039744b9938b5a26',
  //   '46be492ee0f56db11e005991c537c867a8682f77',
  //   '84edf7e474aba8a285d42a2ac1792801c5a2ca40',
  //   '4b602d7a3e268abb45951f623a109d2a131ab0ba',
  //   '69611f33c5c77c00482b17d0be60b2919f7d96da',
  //   '29193e9240a71a735639c66ee954e68414f11236',
  //   'a757e39ff8abb2e2f13e88c9b7ad0105ea459ed9',
  //   '311a7f1387207afac9bcc513ae11e9f89399adf3',
  //   'a2aab4245eed5e00f6571e32ec822d93307e491c',
  //   'cfabf9da70f1d7ffa54c1a8f9ae4076512381104',
  //   '44c49bbab8a3e9999f3ba9dee0186288b1d960a7',
  //   '43f1605fb19313b7eb160ce346b22e2401f21149',
  //   '7317777e3751efa66218f6da5ef0d01dda69af48',
];

export const COMMUNITY = {
  label: __('Nice People'),
  route: '/$/community',
  icon: ICONS.COMMUNITY,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${COMMUNITY_CHANNEL_IDS.join(',')}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 16,
    channelIds: COMMUNITY_CHANNEL_IDS,
    release_time: `>${Math.floor(
      moment()
        .subtract(6, 'months')
        .startOf('week')
        .unix()
    )}`,
  },
};

const TECHNOLOGY_CHANNEL_IDS = [
  'fdc3b71d6e99fe305863ac72721637d2ce49d1ad',
  '8cbef9a7778b528a6183b4bb25bb748bf016b7ca',
  '70d6386888708ce5559ca225120b2801f6e052bd',
  '3e465c0163d8ab5635edb49e6f8f3933fa9cf42a',
  '78d20123fdf5fbcfa2b2a5b71875a3e7e37a8d41',
  '12f1f69fe070a79d171c5964e5a1053b26cb6df6',
  '55f552c153a6922798ce9f6d429b69c87c4c992a',
  '4f0686070ce0ec410ffa10bd46682f54b8d6d94c',
  'f33657a2fcbab2dc3ce555d5d6728f8758af7bc7',
  '2f229d3ac26aa655c5123c29f1f7352403279ca3',
  '8539673ff55e10a7ef2859d16194ad92c4d3a412',
  '5af39f818f668d8c00943c9326c5201c4fe3c423',
  '7b23cca3f49059f005e812be03931c81272eaac4',
  '70645fd323c8730d7fab5528e4fa5883ecebe78a',
  'fba22d346111304c39b51ffc2740238a1449e5fd',
  '3e465c0163d8ab5635edb49e6f8f3933fa9cf42a',
  'd9535951222dd7a1ff7f763872cb0df44f7962bf',
  '3818d442f75be9c3685b6ad58e5ceb8569ade5ee',
  '87b2669c65c60a36aa408f0177517a192db194a7',
  '48c7ea8bc2c4adba09bf21a29689e3b8c2967522',
  '2a6194792beac5130641e932b5ac6e5a99b5ca4f',
  '6e29e20a77e1a6181e60ca19b0f83e8223416aa8',
  '918be99daff84a69e1458cfabfda219f2a05271b',
  '0afddbd02b7068c89d0bce77a0481875c159115f',
  'cda82633c939eb0d605c148277669cfe53cf2b72',
  'd2d3ac174a107b846f497be701e232539c4511f1',
  'a52425228572850f40651d2f8fe965a7d1f7d003',
  'feb61536c007cdf4faeeaab4876cb397feaf6b51',
  '2305db36455aa0d18571015b9e9bd0950262aa0f',
  'a58a006307d0d579792dc677c27f2b6b0422b362',
  'fff58293070966ba11c7a978bc895320e80beab3',
  '243b6f18093ff97c861d0568c7d3379606201a4b',
  'a9d289718f3f14e3d1fa8da7a7fcfdb6f40ae2d7',
  '5af39f818f668d8c00943c9326c5201c4fe3c423',
  '26c9b54d7e47dc8f7dc847821b26fce3009ee1a0',
  'fddb293b297417d753d0175be69a11e59b22ad57',
  'd95fff35a8bb853b9d80c93d7c0dee0b92beab3c',
  '6a4fa1a68b92336e64006a4310cb160b07854329',
  '6453f3d359787856c98f58dd13da44db282904de',
  'd0b97ba2a5eb024f4cc1d972b1c52896f37c32ed',
  '70645fd323c8730d7fab5528e4fa5883ecebe78a',
  'ff9dddaef1f0c7938d7a4a170abef24c70e4cec7',
  '6569758308f12a66001e28f5e6056cb84334e69c',
  '5fbfcf517d3df749bd032a44c1946b2baa738ecb',
  '74333143a3dcc001a5602aa524583fc75a013d75',
  '0d4e104ffc0ff0a6c8701e67cf13760f4e0335a8',
  '7b1c72ba903af4aecdc2595397a9cb91bb7f188d',
  '6c412e4afc8258ab65d83900b46289d68abc3872',
  'fb364ef587872515f545a5b4b3182b58073f230f',
  '589276465a23c589801d874f484cc39f307d7ec7',
  'ba79c80788a9e1751e49ad401f5692d86f73a2db',
  '5b7c7a202201033d99e1be2930d290c127c0f4fe',
  '7f9187dcb2a144c4d71cbab6756e3b1136db18b2',
  'a9d289718f3f14e3d1fa8da7a7fcfdb6f40ae2d7',
  'c5cd9b63e2ba0abc191feae48238f464baecb147',
  '70d0495ea46072bead82429fb405d60438036524',
  'feb61536c007cdf4faeeaab4876cb397feaf6b51',
  '0e2b5b4cf59e859860000ff123dc12a317ad416b',
  '9a311e766fcbc69bd9f37fd068843a1a8b1aeb02',
  'c18996ca488753f714d36d4654715927c1d7f9c2',
  '7a8954b2c09cb835f4b90be69fd4a5fc4f1b5f04',
  '218bf13edaf0add8e60d88ab6a9d4584d7e0588a',
];

export const TECHNOLOGY = {
  label: __('Tech'),
  route: '/$/tech',
  icon: ICONS.TECH,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${
    CS.CHANNEL_IDS_KEY
  }=${TECHNOLOGY_CHANNEL_IDS.join(',')}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 12,
    channelIds: TECHNOLOGY_CHANNEL_IDS,
  },
};

const NEWS_CHANNEL_IDS = [
  '5097b175c4c58c431424ce3b60901de6ae650127',
  '5499c784a960d96497151f5e0e8434b84ea5da24',
  '9614a4fcf9d91e4588eb512165e9c0475f857555',
  '70e56234217f30317c0e67fd0eede6e82b74aea0',
  '760da3ba3dd85830a843beaaed543a89b7a367e7',
  'c9da929d12afe6066acc89eb044b552f0d63782a',
  'ab524c5a1902d7a0f072ebc4d093a0e500704202',
  '21aab81cf6b7f3eac2a5d934d35328560ba6fc9f',
  '9b8a09c41c834f0d629cea4a083f86e4645feb0d',
  '2556ed1cab9d17f2a9392030a9ad7f5d138f11bd',
  '84edf7e474aba8a285d42a2ac1792801c5a2ca40',
  '69b3c0cae5d30be16423b931c4552ed050a244b0',
];

export const NEWS = {
  label: __('News'),
  route: '/$/news',
  icon: ICONS.NEWS,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${CS.CHANNEL_IDS_KEY}=${NEWS_CHANNEL_IDS.join(
    ','
  )}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 8,
    channelIds: NEWS_CHANNEL_IDS,
  },
};

const FINCANCE_CHANNEL_IDS = [];

export const FINANCE = {
  label: __('Finance 2.0'),
  icon: ICONS.FINANCE,
  navigate: `/$/${PAGES.DISCOVER}?${CS.CLAIM_TYPE}=${CS.CLAIM_STREAM}&${CS.CHANNEL_IDS_KEY}=${FINCANCE_CHANNEL_IDS.join(
    ','
  )}`,
  options: {
    orderBy: ['release_time'],
    pageSize: 8,
    channelIds: FINCANCE_CHANNEL_IDS,
  },
};

export default function getHomePageRowData(
  authenticated: boolean,
  showPersonalizedChannels: boolean,
  showPersonalizedTags: boolean,
  subscribedChannels: Array<Subscription>,
  followedTags: Array<Tag>,
  showIndividualTags: boolean
) {
  let rowData: Array<RowDataItem> = [];
  const individualTagDataItems: Array<RowDataItem> = [];

  if (followedTags.length) {
    followedTags.forEach((tag: Tag) => {
      individualTagDataItems.push({
        label: __(`Trending for `) + `#${toCapitalCase(tag.name)}`,
        navigate: `/$/${PAGES.DISCOVER}?t=${tag.name}`,
        options: {
          pageSize: 4,
          tags: [tag.name],
          claimType: ['stream'],
        },
      });
    });
  }

  const RECENT_FROM_FOLLOWING = {
    label: __('Recent From Following'),
    navigate: `/$/${PAGES.CHANNELS_FOLLOWING}`,
    options: {
      orderBy: ['release_time'],
      releaseTime:
        subscribedChannels.length > 20
          ? `>${Math.floor(
              moment()
                .subtract(6, 'months')
                .startOf('week')
                .unix()
            )}`
          : `>${Math.floor(
              moment()
                .subtract(1, 'year')
                .startOf('week')
                .unix()
            )}`,
      pageSize: subscribedChannels.length > 3 ? (subscribedChannels.length > 6 ? 16 : 8) : 4,
      channelIds: subscribedChannels.map((subscription: Subscription) => {
        const { channelClaimId } = parseURI(subscription.uri);
        return channelClaimId;
      }),
    },
  };

  rowData.push(PRIMARY_CONTENT);
  if (showPersonalizedChannels) rowData.push(RECENT_FROM_FOLLOWING);
  rowData.push(ENLIGHTENMENT);
  //   rowData.push(PRIMARY_CONTENT_2);
  rowData.push(GAMING);
  rowData.push(COMMUNITY);
  rowData.push(TECHNOLOGY);

  return rowData;
}

export const EXTRA_SIDEBAR_LINKS = [RABBIT_HOLE, ENLIGHTENMENT, GAMING, TECHNOLOGY, NEWS, FINANCE, COMMUNITY];
