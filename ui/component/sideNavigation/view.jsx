// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import React from 'react';
import { useHistory } from 'react-router';
import Button from 'component/button';
import Tag from 'component/tag';
import StickyBox from 'react-sticky-box/dist/esnext';
import Spinner from 'component/spinner';
import usePersistedState from 'effects/use-persisted-state';
import classnames from 'classnames';
import { PINNED_LABEL_1, PINNED_URI_1, PINNED_URI_2, PINNED_LABEL_2 } from 'config';

const TOP_LEVEL_LINKS = [
  {
    label: __('Home'),
    navigate: `/`,
    icon: ICONS.HOME,
  },
  {
    label: __('Following'),
    navigate: `/$/${PAGES.CHANNELS_FOLLOWING}`,
    icon: ICONS.SUBSCRIBE,
    requiresAuth: !IS_WEB,
  },

  {
    label: __('Your Tags'),
    navigate: `/$/${PAGES.TAGS_FOLLOWING}`,
    icon: ICONS.TAG,
    requiresAuth: !IS_WEB,
  },
  {
    label: __('Discover'),
    navigate: `/$/${PAGES.DISCOVER}`,
    icon: ICONS.DISCOVER,
  },
  {
    label: __('Purchased'),
    navigate: `/$/${PAGES.LIBRARY}`,
    icon: ICONS.PURCHASED,
  },
];

type Props = {
  subscriptions: Array<Subscription>,
  followedTags: Array<Tag>,
  email: ?string,
  uploadCount: number,
  sticky: boolean,
  expanded: boolean,
  doSignOut: () => void,
  location: { pathname: string },
  purchaseSuccess: boolean,
  doClearPurchasedUriSuccess: () => void,
};

function SideNavigation(props: Props) {
  const {
    subscriptions,
    followedTags,
    uploadCount,
    doSignOut,
    email,
    sticky = true,
    expanded = false,
    purchaseSuccess,
    doClearPurchasedUriSuccess,
    sidebarOpen,
  } = props;
  const {
    location: { pathname },
  } = useHistory();

  const isAuthenticated = Boolean(email);
  const [pulseLibrary, setPulseLibrary] = React.useState(false);
  const isOnFilePage = pathname !== '/' && !pathname.includes('/$/');
  const isPersonalized = !IS_WEB || isAuthenticated;

  React.useEffect(() => {
    if (purchaseSuccess) {
      setPulseLibrary(true);

      let timeout = setTimeout(() => {
        setPulseLibrary(false);
        doClearPurchasedUriSuccess();
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [setPulseLibrary, purchaseSuccess, doClearPurchasedUriSuccess]);

  function buildLink(path, label, icon, onClick, requiresAuth = false, isLiteral = false) {
    return {
      navigate: !isLiteral ? `$/${path}` : `${path}`,
      label,
      icon,
      onClick,
      requiresAuth,
    };
  }

  const Wrapper = ({ children }: any) =>
    sticky && !isOnFilePage ? (
      <StickyBox offsetTop={100} offsetBottom={20}>
        {children}
      </StickyBox>
    ) : (
      <div>{children}</div>
    );

  if (!sidebarOpen) {
    return null;
  }

  // We may need to render two sidebars if a user is on a small - medium screen
  // In that case, render the simplified sidebar with large links
  // And potentially render the full sidebar if a user expands the menu

  return (
    <Wrapper>
      {!isOnFilePage && (
        <nav className={classnames('navigation')}>
          <ul className="navigation-links--relative">
            {TOP_LEVEL_LINKS.map(linkProps => (
              <li key={linkProps.navigate}>
                <Button
                  {...linkProps}
                  icon={pulseLibrary && linkProps.icon === ICONS.LIBRARY ? ICONS.PURCHASED : linkProps.icon}
                  className={classnames('navigation-link', {
                    'navigation-link--pulse': linkProps.icon === ICONS.LIBRARY && pulseLibrary,
                  })}
                  activeClass="navigation-link--active"
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Wrapper>
  );
}

export default SideNavigation;

/* <ul className="navigation-links">
  {[
	{
	  ...(expanded && !isAuthenticated ? { ...buildLink(PAGES.AUTH, __('Sign Up'), ICONS.SIGN_UP) } : {}),
	},
	{
	  ...(expanded && !isAuthenticated
		? { ...buildLink(PAGES.AUTH_SIGNIN, __('Sign In'), ICONS.SIGN_IN) }
		: {}),
	},
	{
	  ...buildLink('/', __('Home'), ICONS.HOME, null, null, true),
	},
	{
	  ...buildLink(
		PAGES.CHANNELS_FOLLOWING,
		__('Following'),
		ICONS.SUBSCRIBE,
		null,
		requireAuthOnPersonalizedActions
	  ),
	},
	{
	  ...buildLink(PAGES.TAGS_FOLLOWING, __('Your Tags'), ICONS.TAG, null, requireAuthOnPersonalizedActions),
	},
	{
	  ...buildLink(PAGES.DISCOVER, __('All Content'), ICONS.DISCOVER),
	},
	{
	  ...buildLink(PAGES.LIBRARY, IS_WEB ? __('Purchased') : __('Library'), ICONS.LIBRARY),
	},
	// @if TARGET='web'
	{
	  ...(PINNED_URI_1
		? { ...buildLink(`${PINNED_URI_1}`, `${PINNED_LABEL_1}`, ICONS.PINNED, null, null, true) }
		: {}),
	},
	{
	  ...(PINNED_URI_2
		? { ...buildLink(`${PINNED_URI_2}`, `${PINNED_LABEL_2}`, ICONS.PINNED, null, null, true) }
		: {}),
	},
	// @endif
	{
	  ...(expanded ? { ...buildLink(PAGES.SETTINGS, __('Settings'), ICONS.SETTINGS) } : {}),
	},
  ].map(
	linkProps =>
	  linkProps.navigate && (
		<li key={linkProps.navigate}>
		  <Button
			{...linkProps}
			icon={pulseLibrary && linkProps.icon === ICONS.LIBRARY ? ICONS.PURCHASED : linkProps.icon}
			className={classnames('navigation-link', {
			  'navigation-link--pulse': linkProps.icon === ICONS.LIBRARY && pulseLibrary,
			})}
			activeClass="navigation-link--active"
		  />
		</li>
	  )
  )}

  {expanded &&
	isPersonalized &&
	[
	  {
		...buildLink(PAGES.CHANNELS, __('Channels'), ICONS.CHANNEL),
	  },
	  {
		...buildLink(
		  PAGES.UPLOADS,
		  uploadCount ? (
			<span>
			  {__('Uploads')}
			  <Spinner type="small" />
			</span>
		  ) : (
			__('Uploads')
		  ),
		  ICONS.PUBLISH
		),
	  },
	  {
		...buildLink(PAGES.CREATOR_DASHBOARD, __('Creator Analytics'), ICONS.ANALYTICS),
	  },
	  {
		...buildLink(PAGES.WALLET, __('Wallet'), ICONS.WALLET),
	  },
	  {
		...buildLink(PAGES.REWARDS, __('Rewards'), ICONS.REWARDS),
	  },
	  {
		...buildLink(PAGES.INVITE, __('Invites'), ICONS.INVITE),
	  },
	  {
		...buildLink(PAGES.UPLOAD, __('Upload'), ICONS.PUBLISH),
	  },
	  {
		...buildLink(PAGES.HELP, __('Help'), ICONS.HELP),
	  },
	  {
		...(isAuthenticated ? { ...buildLink(PAGES.AUTH, __('Sign Out'), ICONS.SIGN_OUT, doSignOut) } : {}),
	  },
	].map(
	  linkProps =>
		Object.keys(linkProps).length > 0 &&
		linkProps && (
		  <li key={linkProps.navigate}>
			<Button {...linkProps} className="navigation-link" activeClass="navigation-link--active" />
		  </li>
		)
	)}
</ul>

{isPersonalized && subscriptions && subscriptions.length > 0 && (
  <ul className="navigation__secondary navigation-links--small">
	{subscriptions.map(({ uri, channelName }, index) => (
	  <li key={uri} className="navigation-link__wrapper">
		<Button
		  navigate={uri}
		  label={channelName}
		  className="navigation-link"
		  activeClass="navigation-link--active"
		/>
	  </li>
	))}
  </ul>
)} */
