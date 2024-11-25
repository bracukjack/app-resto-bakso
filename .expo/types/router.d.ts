/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account` | `/account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/customer` | `/account/customer`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/customer/profile` | `/account/customer/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/seller` | `/account/seller`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/change-password` | `/auth/change-password`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/login` | `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/register` | `/auth/register`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order` | `/order`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/customer` | `/order/customer`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller` | `/order/seller`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller/bank-account` | `/order/seller/bank-account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller/promo` | `/order/seller/promo`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/recapitulation-report` | `/recapitulation-report`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-completed` | `/transaction-completed`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-ongoing` | `/transaction-ongoing`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-report` | `/transaction-report`; params?: Router.UnknownInputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownInputParams; } | { pathname: `/navigation`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `${'/(screen)'}/recapitulation-report/detail/[id]` | `/recapitulation-report/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-completed/detail/[id]` | `/transaction-completed/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-ongoing/detail/[id]` | `/transaction-ongoing/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-report/detail/[id]` | `/transaction-report/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/account` | `/account`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/account/customer` | `/account/customer`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/account/customer/profile` | `/account/customer/profile`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/account/seller` | `/account/seller`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/auth/change-password` | `/auth/change-password`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/auth/login` | `/auth/login`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/auth/register` | `/auth/register`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/order` | `/order`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/order/customer` | `/order/customer`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/order/seller` | `/order/seller`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/order/seller/bank-account` | `/order/seller/bank-account`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/order/seller/promo` | `/order/seller/promo`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/recapitulation-report` | `/recapitulation-report`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/transaction-completed` | `/transaction-completed`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/transaction-ongoing` | `/transaction-ongoing`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screen)'}/transaction-report` | `/transaction-report`; params?: Router.UnknownOutputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/navigation`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } } | { pathname: `${'/(screen)'}/recapitulation-report/detail/[id]` | `/recapitulation-report/detail/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `${'/(screen)'}/transaction-completed/detail/[id]` | `/transaction-completed/detail/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `${'/(screen)'}/transaction-ongoing/detail/[id]` | `/transaction-ongoing/detail/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `${'/(screen)'}/transaction-report/detail/[id]` | `/transaction-report/detail/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/account${`?${string}` | `#${string}` | ''}` | `/account${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/account/customer${`?${string}` | `#${string}` | ''}` | `/account/customer${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/account/customer/profile${`?${string}` | `#${string}` | ''}` | `/account/customer/profile${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/account/seller${`?${string}` | `#${string}` | ''}` | `/account/seller${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/auth/change-password${`?${string}` | `#${string}` | ''}` | `/auth/change-password${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/auth/login${`?${string}` | `#${string}` | ''}` | `/auth/login${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/auth/register${`?${string}` | `#${string}` | ''}` | `/auth/register${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/order${`?${string}` | `#${string}` | ''}` | `/order${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/order/customer${`?${string}` | `#${string}` | ''}` | `/order/customer${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/order/seller${`?${string}` | `#${string}` | ''}` | `/order/seller${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/order/seller/bank-account${`?${string}` | `#${string}` | ''}` | `/order/seller/bank-account${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/order/seller/promo${`?${string}` | `#${string}` | ''}` | `/order/seller/promo${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/recapitulation-report${`?${string}` | `#${string}` | ''}` | `/recapitulation-report${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/transaction-completed${`?${string}` | `#${string}` | ''}` | `/transaction-completed${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/transaction-ongoing${`?${string}` | `#${string}` | ''}` | `/transaction-ongoing${`?${string}` | `#${string}` | ''}` | `${'/(screen)'}/transaction-report${`?${string}` | `#${string}` | ''}` | `/transaction-report${`?${string}` | `#${string}` | ''}` | `/data/menuDummy${`?${string}` | `#${string}` | ''}` | `/data/ongkirDummy${`?${string}` | `#${string}` | ''}` | `/data/recapitulationDummy${`?${string}` | `#${string}` | ''}` | `/data/transactionDummy${`?${string}` | `#${string}` | ''}` | `/navigation${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account` | `/account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/customer` | `/account/customer`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/customer/profile` | `/account/customer/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/account/seller` | `/account/seller`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/change-password` | `/auth/change-password`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/login` | `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/auth/register` | `/auth/register`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order` | `/order`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/customer` | `/order/customer`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller` | `/order/seller`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller/bank-account` | `/order/seller/bank-account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/order/seller/promo` | `/order/seller/promo`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/recapitulation-report` | `/recapitulation-report`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-completed` | `/transaction-completed`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-ongoing` | `/transaction-ongoing`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screen)'}/transaction-report` | `/transaction-report`; params?: Router.UnknownInputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownInputParams; } | { pathname: `/navigation`; params?: Router.UnknownInputParams; } | `/+not-found` | `${'/(screen)'}/recapitulation-report/detail/${Router.SingleRoutePart<T>}` | `/recapitulation-report/detail/${Router.SingleRoutePart<T>}` | `${'/(screen)'}/transaction-completed/detail/${Router.SingleRoutePart<T>}` | `/transaction-completed/detail/${Router.SingleRoutePart<T>}` | `${'/(screen)'}/transaction-ongoing/detail/${Router.SingleRoutePart<T>}` | `/transaction-ongoing/detail/${Router.SingleRoutePart<T>}` | `${'/(screen)'}/transaction-report/detail/${Router.SingleRoutePart<T>}` | `/transaction-report/detail/${Router.SingleRoutePart<T>}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `${'/(screen)'}/recapitulation-report/detail/[id]` | `/recapitulation-report/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-completed/detail/[id]` | `/transaction-completed/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-ongoing/detail/[id]` | `/transaction-ongoing/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `${'/(screen)'}/transaction-report/detail/[id]` | `/transaction-report/detail/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}