import { renderQuote } from '../renderers/quote';
import { loadHeader } from '../services/header'
import '../renderers/section-exercises';
import { initFooterForm } from '../services/footer-form';

export const homePage = () => {
  loadHeader();
  renderQuote();
  initFooterForm();
}