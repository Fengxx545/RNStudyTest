

export default class NavigationUtil {

  static goBack(params) {

    const { navigation } = params;
    navigation.goBack();

  }

  static goPage(params, page) {

    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log("NavigationUtil.navigation 不能为null")
      return;
    }
    navigation.navigate(page,
      {
        ...params,
      });

  }

  static goHome(params) {
    const { navigation } = params;
    navigation.navigate("Main", {
      ...params,
    })
  }


}