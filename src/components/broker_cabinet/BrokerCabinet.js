import React, {Component} from 'react';
import Title from '../common/Title';
import TableData from '../common/Table';
import Animation from '../common/Animation';
import PaginationDisplaying from './PaginationDisplaying';
import Menu from '../common/Menu';
import Chat from '../common/Chat';

const menuData = [
  {
    "id": "opened-deal",
    "label": "Открытые сделки"
  },
  {
    "id": "archieve-deal",
    "label": "Архив сделок"
  },
  {
    "id": "chose-broker",
    "label": "Заключить договор"
  },
  {
    "id": "new-deal",
    "label": "Новая сделка"
  },
  {
    "id": "chat",
    "label": "Чат с брокером"
  },
  {
    "id": "dissolve-broker",
    "label": "Расторгнуть договор"
  },
  {
    "id": "account-balance",
    "label": "Баланс счетов"
  },
  {
    "id": "withdrawal-of-funds",
    "label": "Вывод средств"
  },

]