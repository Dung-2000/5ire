import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  QuestionCircle20Regular,
  ArrowRight16Regular,
  ArrowLeft16Regular,
  Mail20Regular,
  Chat20Regular,
  EmojiMeme20Regular,
  Alert20Regular,
} from '@fluentui/react-icons';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppearanceStore from 'stores/useAppearanceStore';

export default function Footer({ collapsed }: { collapsed: boolean }) {
  const toggleSidebarCollapsed = useAppearanceStore(
    (state) => state.toggleSidebarCollapsed
  );
  const { t } = useTranslation();
  const goFeedback = useCallback(() => {
    window.electron.openExternal('https://5ire.canny.io/');
    window.electron.ingestEvent([{ app: 'go-feedback' }]);
  }, []);
  const getHomepage = useCallback(() => {
    window.electron.openExternal('https://5ire.app');
    window.electron.ingestEvent([{ app: 'go-homepage' }]);
  }, []);

  const mailToSupport = useCallback(() => {
    window.electron.openExternal('mailto:support@5ire.app');
  }, []);

  const goGitHub = useCallback(() => {
    window.electron.openExternal('https://github.com/nanbingxyz/5ire');
    window.electron.ingestEvent([{ app: 'go-github' }]);
  }, []);

  useEffect(() => {
    //@ts-ignore
    const canny = Window?.Canny;
    if (canny) {
      canny('initChangelog', {
        appID: '64cd076f9481f00996a16c42',
        position: 'top',
        align: 'left',
        theme: 'auto',
      });
    }
    //@ts-ignore
  }, [Window?.Canny]);

  return (
    <div
      className={`flex w-full items-center justify-between self-baseline border-t border-base bg-brand-sidebar px-6 py-2 ${
        collapsed ? 'flex-col' : ''
      }`}
    >
      <button
        data-canny-changelog
        type="button"
        className={`flex items-center gap-x-1 rounded-md px-2 py-2 text-xs font-medium text-brand-secondary outline-none hover:bg-brand-surface-1 hover:text-brand-base ${
          collapsed ? 'w-full justify-center' : ''
        }`}
        title="Shortcuts"
        aria-label="changelog"
      >
        <Alert20Regular />
      </button>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button
            type="button"
            className={`flex items-center gap-x-1 rounded-md px-2 py-2 text-xs font-medium text-brand-secondary outline-none hover:bg-brand-surface-1 hover:text-brand-base ${
              collapsed ? 'w-full justify-center' : ''
            }`}
            title={t('Common.Help')}
          >
            <QuestionCircle20Regular />
            {collapsed ? '' : <span>{t('Common.Help')}</span>}
          </button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem icon={<Chat20Regular />} onClick={goFeedback}>
              {t('Common.Feedback')}
            </MenuItem>
            <MenuItem
              icon={
                <svg
                  width="18px"
                  height="18px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
              onClick={goGitHub}
            >
              {t('Common.GitHub')}
            </MenuItem>
            <MenuItem icon={<EmojiMeme20Regular />} onClick={getHomepage}>
              {t('Common.About')}
            </MenuItem>
            <MenuItem icon={<Mail20Regular />} onClick={mailToSupport}>
              support@5ire.app
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <button
        type="button"
        className={`hidden items-center gap-3 rounded-md px-2 py-2 text-xs font-medium outline-none hover:bg-brand-surface-1 hover:text-brand-base md:flex ${
          collapsed ? 'w-full justify-center' : ''
        }`}
        onClick={() => toggleSidebarCollapsed()}
      >
        {collapsed ? <ArrowRight16Regular /> : <ArrowLeft16Regular />}
      </button>
      <div className="relative" />
    </div>
  );
}
