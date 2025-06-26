import { renderQuote } from '../renderers/quote';
import { loadHeader } from '../services/header'
import '../renderers/section-exercises';

export const homePage = () => {
  loadHeader();
  renderQuote();
}