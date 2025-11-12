/**
 * 에러 타입에 따라 사용자 친화적인 메시지를 반환합니다
 * @param {Error} error - 에러 객체
 * @returns {Object} - { title, message, icon }
 */
export const getErrorMessage = (error) => {
  // 네트워크 에러
  if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
    return {
      title: "네트워크 연결 오류",
      message: "인터넷 연결을 확인하고 다시 시도해주세요.",
      icon: "🌐",
    };
  }

  // HTTP 상태 코드별 처리
  const status = error.response?.status;

  switch (status) {
    case 400:
      return {
        title: "잘못된 요청",
        message: "요청 정보가 올바르지 않습니다.",
        icon: "⚠️",
      };

    case 401:
      return {
        title: "인증 오류",
        message: "API 키가 유효하지 않습니다. 관리자에게 문의하세요.",
        icon: "🔒",
      };

    case 404:
      return {
        title: "영화를 찾을 수 없습니다",
        message: "요청하신 영화 정보를 찾을 수 없습니다.",
        icon: "🔍",
      };

    case 429:
      return {
        title: "요청 횟수 초과",
        message: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
        icon: "⏱️",
      };

    case 500:
    case 502:
    case 503:
      return {
        title: "서버 오류",
        message: "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        icon: "🔧",
      };

    case 504:
      return {
        title: "요청 시간 초과",
        message: "서버 응답 시간이 초과되었습니다. 다시 시도해주세요.",
        icon: "⏱️",
      };

    default:
      // 기타 에러
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        return {
          title: "요청 시간 초과",
          message: "서버 응답 시간이 초과되었습니다. 다시 시도해주세요.",
          icon: "⏱️",
        };
      }

      return {
        title: "오류가 발생했습니다",
        message: "영화를 불러오는데 실패했습니다. 다시 시도해주세요.",
        icon: "❌",
      };
  }
};

/**
 * 에러 컨텍스트에 따른 메시지 커스터마이징
 * @param {Error} error - 에러 객체
 * @param {string} context - 에러 발생 컨텍스트 (search, detail, list 등)
 * @returns {Object} - { title, message, icon }
 */
export const getContextualErrorMessage = (error, context) => {
  const baseError = getErrorMessage(error);

  // 컨텍스트별 메시지 커스터마이징
  switch (context) {
    case "search":
      return {
        ...baseError,
        message: `검색 중 오류가 발생했습니다. ${baseError.message}`,
      };

    case "detail":
      return {
        ...baseError,
        message: `영화 상세 정보를 불러오지 못했습니다. ${baseError.message}`,
      };

    case "list":
      return {
        ...baseError,
        message: `영화 목록을 불러오지 못했습니다. ${baseError.message}`,
      };

    case "reviews":
      return {
        ...baseError,
        message: `리뷰를 불러오지 못했습니다. ${baseError.message}`,
      };

    case "recommendations":
      return {
        ...baseError,
        message: `추천 영화를 불러오지 못했습니다. ${baseError.message}`,
      };

    default:
      return baseError;
  }
};
