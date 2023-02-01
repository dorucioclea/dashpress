import { IValueLabel } from "@hadmean/chromista/dist/types";
import { userFriendlyCase } from "frontend/lib/strings";
import { nanoid } from "nanoid";
import { IWidgetConfig } from "shared/types/dashboard";
import { ROYGBIV } from "shared/constants/colors";

const DEFAULT_NUMBER_OF_SUMMARY_CARDS = 8;

const colorsList = Object.keys(ROYGBIV);

export const generatePortalDashboardWidgets = async (
  entitiesToShow: IValueLabel[],
  getEntityFirstDateFieldType: (entity: string) => Promise<string>
) => {
  const defaultWidgets: IWidgetConfig[] = await Promise.all(
    entitiesToShow
      .slice(0, DEFAULT_NUMBER_OF_SUMMARY_CARDS)
      .map(async (entity, index) => {
        const dateField = await getEntityFirstDateFieldType(entity.value);

        return {
          id: nanoid(),
          title: userFriendlyCase(`${entity.value}`),
          _type: "summary-card",
          entity: entity.value,
          queryId: "",
          color: colorsList[index % (colorsList.length - 1)],
          dateField,
          icon: `<svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M10.0811 4.08935C10.6111 4.45511 11.1177 4.69614 11.5352 4.74929C11.3076 5.20138 11.1488 5.68691 11.0659 6.18856C10.3925 6.04081 9.75356 5.6858 9.22916 5.32393C8.96994 5.14504 8.7245 4.95442 8.5 4.76675V7.00005C8.5 7.3063 8.31381 7.58174 8.02974 7.69593L8.02354 7.69849C8.01733 7.70107 8.0067 7.70553 7.99202 7.71188C7.96264 7.72459 7.91715 7.74477 7.85841 7.77242C7.74069 7.82781 7.57111 7.91252 7.3721 8.02624C6.97012 8.25594 6.46791 8.5928 6.03033 9.03038C5.57681 9.4839 5.29723 10.093 5.13933 10.566C4.93681 11.1727 4.42116 11.7319 3.68711 11.8542C3.57914 11.8722 3.5 11.9656 3.5 12.0751V13.828C3.5 13.9934 3.61961 14.1346 3.7828 14.1618C4.40671 14.2658 4.89825 14.6731 5.17464 15.1679C5.42601 15.6179 5.87291 16.3123 6.53033 16.9697C7.04118 17.4806 7.63608 17.8081 8.11482 18.0085C8.3521 18.1078 8.55481 18.1733 8.69504 18.2133C8.76497 18.2333 8.81882 18.2468 8.853 18.2548C8.87007 18.2588 8.88219 18.2615 8.88889 18.2629L8.8937 18.2639L8.89478 18.2642C9.24631 18.3333 9.5 18.6415 9.5 19.0001V20.2501C9.5 20.3881 9.61193 20.5001 9.75 20.5001H11C11 19.6716 11.6716 19.0001 12.5 19.0001H14.5C15.3284 19.0001 16 19.6716 16 20.5001H17.25C17.3881 20.5001 17.5 20.3881 17.5 20.2501V18.0001C17.5 17.7172 17.6597 17.4583 17.9118 17.3306L17.9251 17.3235C17.939 17.3159 17.9629 17.3026 17.9953 17.2833C18.0602 17.2447 18.1586 17.1825 18.2796 17.0952C18.5223 16.9199 18.851 16.6465 19.1806 16.262C19.8329 15.5009 20.5 14.2941 20.5 12.5001C20.5 11.4934 20.3118 10.6797 19.9913 10.0125C20.3492 9.53751 20.619 9.00301 20.7894 8.43653C20.8886 8.5724 20.9827 8.71346 21.0713 8.85993C21.6755 9.85813 22 11.063 22 12.5001C22 14.706 21.1671 16.2492 20.3194 17.2381C19.899 17.7287 19.4777 18.0802 19.1579 18.3112C19.1021 18.3514 19.0493 18.3881 19 18.4214V20.2501C19 21.2166 18.2165 22.0001 17.25 22.0001H16C15.1716 22.0001 14.5 21.3285 14.5 20.5001H12.5C12.5 21.3285 11.8284 22.0001 11 22.0001H9.75C8.7835 22.0001 8 21.2166 8 20.2501V19.5675C7.86194 19.5209 7.7053 19.4631 7.53573 19.3922C6.93965 19.1427 6.15955 18.7203 5.46967 18.0304C4.68564 17.2464 4.16052 16.4283 3.8651 15.8994C3.77791 15.7433 3.64768 15.66 3.5362 15.6414C2.64973 15.4937 2 14.7267 2 13.828V12.0751C2 11.2324 2.60926 10.5132 3.44051 10.3746C3.52742 10.3601 3.6555 10.2738 3.71651 10.0911C3.90886 9.51484 4.28209 8.6573 4.96967 7.96972C5.53209 7.40731 6.15488 6.99416 6.6279 6.72387C6.76427 6.64594 6.88983 6.57897 7 6.52288V3.67121C7 2.73331 8.13062 2.34833 8.73986 2.95499C9.07031 3.28404 9.55006 3.72288 10.0811 4.08935Z" />
            <path d="M13.07 8.84808C12.5799 8.64513 12.1664 8.25981 12.0679 7.7386C11.7239 5.91712 12.6886 4.04231 14.4689 3.30468C16.5098 2.45911 18.8498 3.42812 19.6954 5.46902C20.433 7.24939 19.7898 9.25732 18.2587 10.3023C17.8206 10.6013 17.2557 10.5814 16.7656 10.3785L13.07 8.84808ZM17.4641 9.02758C18.3837 8.36546 18.7617 7.13428 18.3096 6.04317C17.7811 4.7676 16.3186 4.16197 15.0431 4.69045C13.952 5.14252 13.3489 6.28046 13.5311 7.39885C13.5369 7.40342 13.544 7.40861 13.5525 7.41427C13.5761 7.43001 13.6068 7.44684 13.6439 7.46221L17.3395 8.99263C17.3767 9.008 17.4103 9.0178 17.4381 9.02336C17.4481 9.02535 17.4568 9.0267 17.4641 9.02758Z" />
            <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44774 7.44772 9.00002 8 9.00002C8.55228 9.00002 9 9.44774 9 10Z" />
            </svg>`,
        };
      })
  );

  const firstEntity = entitiesToShow[0];
  if (firstEntity) {
    defaultWidgets.push({
      id: nanoid(),
      title: userFriendlyCase(`${firstEntity.value}`),
      _type: "table",
      entity: firstEntity.value,
      queryId: "",
    });
  }

  return defaultWidgets;
};
