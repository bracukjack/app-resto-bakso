/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/kabupaten`; params?: Router.UnknownInputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AppNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AuthNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/TabNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/CustomerAccountStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/CustomerOrderStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/SellerAccountStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/SellerOrderStack`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/ChangePasswordScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/CustomerAccountScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/EditProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompleteListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompletedDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/order/CustomerOrderScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/EditProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/SellerAccountScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/SellerChangePasswordScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionHistoryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/EditBankScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/SellerOrderScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/delivery/CreateDeliveryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/delivery/EditPromoScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/produk/EditProductScreen`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/data/kabupaten`; params?: Router.UnknownOutputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/AppNavigator`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/AuthNavigator`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/TabNavigator`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/stacks/CustomerAccountStack`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/stacks/CustomerOrderStack`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/stacks/SellerAccountStack`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/stacks/SellerOrderStack`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/auth/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/auth/RegisterScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/ChangePasswordScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/CustomerAccountScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/EditProfileScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompleteListScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompletedDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingListScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/customer/order/CustomerOrderScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/EditProfileScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/SellerAccountScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/SellerChangePasswordScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationListScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionHistoryScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionListScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/order/EditBankScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/order/SellerOrderScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/order/delivery/CreateDeliveryScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/order/delivery/EditPromoScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/seller/order/produk/EditProductScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/data/kabupaten${`?${string}` | `#${string}` | ''}` | `/data/menuDummy${`?${string}` | `#${string}` | ''}` | `/data/ongkirDummy${`?${string}` | `#${string}` | ''}` | `/data/recapitulationDummy${`?${string}` | `#${string}` | ''}` | `/data/transactionDummy${`?${string}` | `#${string}` | ''}` | `/navigations/AppNavigator${`?${string}` | `#${string}` | ''}` | `/navigations/AuthNavigator${`?${string}` | `#${string}` | ''}` | `/navigations/TabNavigator${`?${string}` | `#${string}` | ''}` | `/navigations/stacks/CustomerAccountStack${`?${string}` | `#${string}` | ''}` | `/navigations/stacks/CustomerOrderStack${`?${string}` | `#${string}` | ''}` | `/navigations/stacks/SellerAccountStack${`?${string}` | `#${string}` | ''}` | `/navigations/stacks/SellerOrderStack${`?${string}` | `#${string}` | ''}` | `/screens/auth/LoginScreen${`?${string}` | `#${string}` | ''}` | `/screens/auth/RegisterScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/ChangePasswordScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/CustomerAccountScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/EditProfileScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/transactionCompleted/CompleteListScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/transactionCompleted/CompletedDetailScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/account/transactionOnGoing/OnGoingListScreen${`?${string}` | `#${string}` | ''}` | `/tabs/customer/order/CustomerOrderScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/EditProfileScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/SellerAccountScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/SellerChangePasswordScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/recapitulation/RecapitulationDetailScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/recapitulation/RecapitulationListScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/transaction/TransactionDetailScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/transaction/TransactionHistoryScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/account/transaction/TransactionListScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/order/EditBankScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/order/SellerOrderScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/order/delivery/CreateDeliveryScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/order/delivery/EditPromoScreen${`?${string}` | `#${string}` | ''}` | `/tabs/seller/order/produk/EditProductScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/kabupaten`; params?: Router.UnknownInputParams; } | { pathname: `/data/menuDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/ongkirDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/recapitulationDummy`; params?: Router.UnknownInputParams; } | { pathname: `/data/transactionDummy`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AppNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AuthNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/TabNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/CustomerAccountStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/CustomerOrderStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/SellerAccountStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/stacks/SellerOrderStack`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/ChangePasswordScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/CustomerAccountScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/EditProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompleteListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionCompleted/CompletedDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/account/transactionOnGoing/OnGoingListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/customer/order/CustomerOrderScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/EditProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/SellerAccountScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/SellerChangePasswordScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/recapitulation/RecapitulationListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionHistoryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/account/transaction/TransactionListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/EditBankScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/SellerOrderScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/delivery/CreateDeliveryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/delivery/EditPromoScreen`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/seller/order/produk/EditProductScreen`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
